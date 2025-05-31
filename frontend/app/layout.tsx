import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Stellar Payment DApp",
  description: "Payment DApp built on Stellar",
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="en" className="bg-gray-900 text-gray-100">
      <body className="min-h-screen flex flex-col">
        <header className="bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-white">Stellar Dapp</h1>
          </div>
        </header>
        <main className="flex-grow">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="border-4 border-dashed border-gray-700 rounded-lg p-6">
                {children}
              </div>
            </div>
          </div>
        </main>
        <footer className="bg-gray-800 text-center py-4 text-sm text-gray-400">
          © 2025 Stellar Dapp. All rights reserved.
        </footer>
      </body>
    </html>
  );
};

export default Layout;
