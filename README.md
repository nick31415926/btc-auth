# BTC Auth

**BTC Auth** is a decentralized, passwordless authentication system that uses Bitcoin public/private key cryptography instead of centralized identity providers like Google, Facebook, or traditional email/password systems.

No passwords, no tracking, no third-party logins. Just cryptographic proof of ownership.

---

## 🚀 Features

- 🔐 Authenticate using your Bitcoin wallet
- ⚡ Free and fast — no blockchain transactions required
- 🧱 Lightweight SDK and Express backend
- 🧪 Fully local and self-verifiable
- 🧩 Easy to integrate into any website or app
- 🧩 First-class support for Unisat Wallet (desktop & mobile QR)

---

## 🧰 How It Works

1. The client requests a **login challenge** from the server
2. The user **signs the challenge** using their Bitcoin wallet (message signing)
3. The server **verifies** the signature against the public BTC address
4. On success, the server issues a **JWT session token**

---

## 📐 Architecture Diagram

```
User Wallet       ─────────────┐
                              ▼
  [Frontend App] ── Get Challenge ──▶ [Backend Server]
         ▲                          │
         └── Sign Challenge ◀───────┘
         ▼
  Send Signature ─────────────────▶ Verify & Issue JWT
         ▼
     Authenticated Session
```

---

## 🛠️ Developer Notes

### Verifying a Signature

```ts
import { verifySignature } from './services/verifySignature';

const isValid = verifySignature(address, signature, message);
```

### Storing a Challenge

```ts
import { storeChallenge, getChallenge } from './services/challengeStore';

await storeChallenge(address, challenge);
const stored = await getChallenge(address);
```

---

## 🦊 Unisat Wallet Support

BTC Auth integrates with [Unisat Wallet](https://unisat.io/) for secure Bitcoin-based login using both the browser extension and mobile app.

### ✨ How it Works

- On desktop, BTC Auth connects to the Unisat browser extension to request a message signature
- On mobile, BTC Auth generates a QR code containing the challenge string
- Users scan the QR with the Unisat mobile app and sign it
- The signed message is sent back to the server for verification

### 📦 Requirements

- Unisat browser extension (Chrome/Brave)
- Or Unisat iOS/Android mobile app with camera support
- BTC wallet with message signing capability

### 🛠️ Status

| Platform      | Method           | Status |
|---------------|------------------|--------|
| Desktop       | Extension API    | ✅     |
| Mobile        | QR scan & sign   | 🔜     |

---

## 📦 Getting Started

### 🔧 Prerequisites

- Node.js (18+)
- pnpm (or npm/yarn)
- Git

### 📂 Installation

```bash
git clone https://github.com/yourname/btc-auth.git
cd btc-auth
pnpm install
```

### 🏁 Running the Demo Locally

```bash
# Start the backend server
cd packages/server
pnpm dev

# Start the demo frontend
cd ../../apps/demo-site
pnpm dev
```

---

## 🧰 Monorepo Structure

This project uses a `pnpm` workspace layout:

```
/btc-auth
├── apps/            # Frontend applications (e.g., demo site)
├── packages/        # Core libraries and backend
├── shared/          # Type definitions
├── tsconfig.json    # Project references root
├── pnpm-workspace.yaml
```

---

## 💻 Project Structure

```
btc-auth/
├── packages/
│   ├── sdk/             # Frontend SDK for BTC Auth
│   └── server/          # Express backend for challenge/verify
│       ├── services/    # Core services like verifySignature and challengeStore
│       └── utils.ts     # Common cryptographic utilities
├── apps/
│   └── demo-site/   # Example website using BTC Auth
├── shared/          # Shared types and utilities
└── README.md
```

---

## 🤝 Contributing

Want to help expand wallet support or improve UX?

1. Fork this repo
2. Create a feature branch
3. Submit a PR with a clear description

Suggestions, issues, and contributions welcome!

---

## 📜 License

MIT License