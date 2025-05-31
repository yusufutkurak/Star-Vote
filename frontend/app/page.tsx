"use client";

import React, { useEffect, useState } from "react";
import freighterApi from "@stellar/freighter-api";
import * as StellarSdk from "@stellar/stellar-sdk";

interface VoteOption {
  id: number;
  name: string;
  description: string;
  votes: number;
  fundingAddress: string;
}

export default function VotingApp() {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [votingResults, setVotingResults] = useState<VoteOption[]>([
    {
      id: 1,
      name: "Seçenek A",
      description: "Çevre dostu enerji projeleri",
      votes: 0,
      fundingAddress: "GCLNPW7ZRBNJSQ6PPWSRJ6EZVQSJ5BKDXMZLZTXZXLK7VYEQGNPJGVZS"
    },
    {
      id: 2,
      name: "Seçenek B", 
      description: "Eğitim teknolojileri geliştirme",
      votes: 0,
      fundingAddress: "GDGXJHKDSLHGFKJSDHGKJSHDGKJSHDGKJSHDGKJSHDGKJSHDGKJSHDGK"
    },
    {
      id: 3,
      name: "Seçenek C",
      description: "Sağlık hizmetleri iyileştirme",
      votes: 0,
      fundingAddress: "GAHKJSDHGKJSHDGKJSHDGKJSHDGKJSHDGKJSHDGKJSHDGKJSHDGKJSH"
    }
  ]);

  // Sayfa yüklendiğinde cüzdan bağlı mı kontrol et
  useEffect(() => {
    const checkFreighter = async () => {
      try {
        const connected = await freighterApi.isConnected();
        if (connected) {
          const { address } = await freighterApi.getAddress();
          setPublicKey(address);
        }
      } catch (error) {
        console.error("Error checking Freighter connection:", error);
      }
    };

    checkFreighter();
  }, []);

  // Bağlan butonuna basıldığında çalışır
  const handleConnectWallet = async () => {
    try {
      setIsLoading(true);
      await freighterApi.setAllowed();
      const { address } = await freighterApi.getAddress();
      setPublicKey(address);
    } catch (error) {
      console.error("Error connecting to Freighter:", error);
      alert("Cüzdan bağlantısında hata oluştu!");
    } finally {
      setIsLoading(false);
    }
  };

  // Oy verme işlemi
  const handleVote = async () => {
    if (!publicKey || selectedOption === null) {
      alert("Lütfen cüzdanınızı bağlayın ve bir seçenek seçin!");
      return;
    }

    try {
      setIsLoading(true);
      
      // Seçilen seçeneği bul
      const option = votingResults.find(opt => opt.id === selectedOption);
      if (!option) return;

      // Burada Soroban akıllı sözleşmesi çağrısı yapılacak
      // Şimdilik simüle edildi
      
      // Oy sayısını artır
      const updatedResults = votingResults.map(opt => 
        opt.id === selectedOption 
          ? { ...opt, votes: opt.votes + 1 }
          : opt
      );
      
      setVotingResults(updatedResults);
      setSelectedOption(null);
      
      alert(`${option.name} için oyunuz başarıyla kaydedildi!`);
      
    } catch (error) {
      console.error("Voting error:", error);
      alert("Oy verme işleminde hata oluştu!");
    } finally {
      setIsLoading(false);
    }
  };

  const totalVotes = votingResults.reduce((sum, option) => sum + option.votes, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Stellar Oylama DApp
          </h1>
          <p className="text-xl text-gray-300">
            Oyunuzu verin ve desteklediğiniz projeye fonlama yapın
          </p>
        </div>

        {/* Wallet Connection */}
        <div className="max-w-md mx-auto mb-12">
          {publicKey ? (
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white font-medium">Cüzdan Bağlı</span>
              </div>
              <p className="text-gray-300 text-sm mt-2 text-center break-all">
                {publicKey.substring(0, 8)}...{publicKey.substring(publicKey.length - 8)}
              </p>
            </div>
          ) : (
            <button
              onClick={handleConnectWallet}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {isLoading ? "Bağlanılıyor..." : "🚀 Freighter Cüzdanını Bağla"}
            </button>
          )}
        </div>

        {/* Voting Options */}
        {publicKey && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-8">
              Oylama Seçenekleri
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {votingResults.map((option) => {
                const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
                
                return (
                  <div
                    key={option.id}
                    className={`bg-white/10 backdrop-blur-md rounded-xl p-6 border transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                      selectedOption === option.id
                        ? 'border-blue-400 bg-blue-500/20 shadow-lg shadow-blue-500/25'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                    onClick={() => setSelectedOption(option.id)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white">{option.name}</h3>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedOption === option.id
                          ? 'border-blue-400 bg-blue-400'
                          : 'border-gray-400'
                      }`}>
                        {selectedOption === option.id && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-4">{option.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Oy Sayısı</span>
                        <span className="text-white font-medium">{option.votes}</span>
                      </div>
                      
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      
                      <div className="text-center text-sm text-gray-400">
                        {percentage.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Vote Button */}
            <div className="text-center">
              <button
                onClick={handleVote}
                disabled={isLoading || selectedOption === null}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {isLoading ? "İşleniyor..." : "🗳️ Oy Ver ve Fonla"}
              </button>
            </div>

            {/* Stats */}
            <div className="mt-12 bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white text-center mb-4">
                Toplam İstatistikler
              </h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  {totalVotes}
                </div>
                <div className="text-gray-300">
                  Toplam Oy
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}