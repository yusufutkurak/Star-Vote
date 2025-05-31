#![no_std]

use soroban_sdk::{
    contract, contractimpl, contracttype, token, Address, Env, Map, Vec,
    panic_with_error, symbol_short, Symbol,
};

// Hata kodları
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum VotingError {
    AlreadyVoted = 1,
    InvalidOption = 2,
    InsufficientFunds = 3,
    TransferFailed = 4,
}

// Veri yapıları
#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct VoteRecord {
    pub voter: Address,
    pub option_id: u32,
    pub recipient: Address,
    pub amount: i128,
    pub timestamp: u64,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct VotingOption {
    pub id: u32,
    pub name: Symbol,
    pub description: Symbol,
    pub recipient_address: Address,
    pub vote_count: u32,
    pub total_amount: i128,
}

// Storage anahtarları
const VOTE_RECORDS: Symbol = symbol_short!("VOTES");
const VOTER_STATUS: Symbol = symbol_short!("VOTED");
const VOTE_COUNTS: Symbol = symbol_short!("COUNTS");
const TOTAL_VOTES: Symbol = symbol_short!("TOTAL");
const ADMIN: Symbol = symbol_short!("ADMIN");
const NATIVE_TOKEN: Symbol = symbol_short!("NATIVE");
const VOTE_AMOUNT: Symbol = symbol_short!("AMOUNT");

#[contract]
pub struct VotingContract;

#[contractimpl]
impl VotingContract {
    /// Contract'ı başlatır
    pub fn initialize(env: Env, admin: Address) {
        // Admin ayarla
        env.storage().instance().set(&ADMIN, &admin);
        
        // Toplam oy sayısını sıfırla
        env.storage().instance().set(&TOTAL_VOTES, &0u32);
        
        // Her seçenek için oy sayısını sıfırla
        for option_id in 1..=3 {
            let key = (VOTE_COUNTS, option_id);
            env.storage().instance().set(&key, &0u32);
        }
        
        // Native token adresini ayarla (XLM)
        let native_token = token::stellar_asset_contract_address(&env, token::StellarAsset::Native);
        env.storage().instance().set(&NATIVE_TOKEN, &native_token);
        
        // Varsayılan oy miktarını ayarla (0.1 XLM = 1,000,000 stroops)
        env.storage().instance().set(&VOTE_AMOUNT, &1_000_000i128);
    }
    
    /// Oy verme fonksiyonu
    pub fn vote(
        env: Env,
        voter: Address,
        option_id: u32,
        recipient: Address,
        amount: i128,
    ) -> Result<(), VotingError> {
        // Voter'ın yetkilendirmesini kontrol et
        voter.require_auth();
        
        // Geçerli seçenek kontrolü (1, 2, veya 3)
        if option_id < 1 || option_id > 3 {
            return Err(