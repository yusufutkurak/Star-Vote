# 📦 Star Vote

This project is a voting dApp built using **Stellar and Soroban**. It offers a simple, modern and powerful solution.

## 🚀 Features

- **Next.js** based modern frontend
- **Rust / Soroban** smart contracts
- 🔑 **Freighter wallet** link
- ⚡ 3 different voting options (A, B, C)
- 🎨 Elegant and intuitive user interface (with Tailwind CSS)

## 📂 Project Structure

```bash
/contract # Rust/Soroban smart contract codes
/app # Next.js application
/tailwind.config.js # Tailwind configuration
/README.md # This document!
```

## 🛠️ Installation

1️⃣ **Clone the repo:**
```bash
git clone https://github.com/<user_adi>/<repo_adi>.git
cd <repo_adi>
```

2️⃣ **Install dependencies:**
```bash
npm install
```

3️⃣ **Start the development server:**
```bash
npm run dev
```

4️⃣ **To build the smart contract:**
```bash
cd contract
cargo build --target wasm32-unknown-unknown --release
```



## ⚙️ Usage


- Link your wallet on the main page.
- Select the option you want to vote for and submit it.
- Every vote is recorded as a Stellar transaction!

## 📸 Screenshots

<img width="1617" alt="Ekran Resmi 2025-05-31 13 49 40" src="https://github.com/user-attachments/assets/21c70e8b-60cf-4c65-8977-16e73574d2ea" />


## 📄 Undergraduate

This project is licensed under the [MIT Licence](LICENSE).

---

✨ **If you want to contribute:**  
- We are waiting for your PRs!  
- You can open new feature suggestions and bug reports.

---

🔗 **Links:**
- 🌐 [Stellar Developer Docs](https://developers.stellar.org/docs/)
- 🔧 [Soroban Documentation](https://soroban.stellar.org/docs)
- 💼 [Freighter Wallet](https://freighter.app/)

---

**Note:** Make sure to complete the Soroban smart contract compilation in the `contract` folder before running the project!
