# 📌 Job Application Tracker – Backend

A backend service for tracking job applications, their lifecycle stages, and status transitions.

This project is intentionally built as a production-style backend, focusing on:

- 🧱 clear domain boundaries

- 🔐 authentication and ownership enforcement

- 🧠 thoughtful data modeling

- 📜 auditability of state changes

- 🧩 incremental, maintainable architecture

---

## 🚦 Project Status

🟢 Core backend functionality implemented

The backend currently supports:

- 🔑 user authentication with JWT

- 👤 user-scoped job application management

- 🔄 controlled application status updates

- 🕒 immutable status history tracking

- 🛡️ strict type safety and ownership enforcement

The project continues to evolve with an emphasis on correctness and stability, not feature churn.

---

## ✨ Key Features

- 🔐 JWT-based authentication

- 👥 Strict user ownership enforcement

- 💼 Job application lifecycle management

- 📊 Append-only status history (audit trail)

- 🔍 Clear separation of read and write operations

- 🧠 Strict TypeScript configuration

- 🧾 Intentional, well-structured Git history

---

## 🛠️ Tech Stack

- ⚙️ Node.js

- 🧠 TypeScript (ESM, strict mode)

- 🚏 Express

- ☁️ MongoDB Atlas

- 📦 Mongoose

- 🔑 JWT Authentication

---

## ❓ Why MongoDB?

The project initially explored PostgreSQL + Prisma.
Due to repeated local development friction on macOS, the persistence layer was intentionally switched to MongoDB Atlas to maintain development stability and momentum during domain modeling.
This decision is pragmatic, not ideological — the overall domain and API design remain database-agnostic.

---

## ▶️ Getting Started (Development)

```bash
npm install
npm run dev
```

🚀 Server

Runs on:

http://localhost:8000

---

## ❤️ Health Check

GET /health

## 🧩 API Overview (Current)

🔐 Authentication

User registration and login (JWT-based)

---

## 💼 Job Applications

Create, list, update status, and delete applications

All operations are user-scoped

---

## 🕒 Status History

Read-only endpoint for application status transitions

History is append-only and immutable

---

## 🧠 Project Philosophy

This project deliberately prioritizes:

- 🧼 clarity over cleverness

- 🪨 stability over feature count

- 🧭 explicit behavior over abstractions

- ✅ correctness over shortcuts

Several features are intentionally deferred to avoid premature complexity.

---

## 🗺️ Roadmap

Planned next steps:

- 🧪 request validation

- 🚨 centralized error handling

- 📘 improved API documentation

- 📝 notes and follow-ups on applications

- 🧪 lightweight testing strategy

A deeper technical breakdown will be added as the project matures.

---

# 👤 Author

Lalman
