# 📌 Job Application Tracker – Backend

A backend service for tracking job applications, their lifecycle stages, and status transitions.

This project is intentionally built as a production-style backend, focusing on:

- 🧱 clear domain boundaries

- 🔐 authentication and ownership enforcement

- 🧠 thoughtful, audit-friendly data modeling

- 📜 immutable state transition history

- 🧩 incremental, maintainable architecture

- 🛡️ correctness over convenience

---

## 🚦 Project Status

🟢 Core backend functionality implemented

🟢 Integration-level controller testing in place

🟡 CI temporarily disabled (environment resolution inconsistencies)

The backend currently includes:

- 🔑 JWT-based authentication

- 👤 strict user-scoped data access

- 💼 full job application CRUD

- 🔄 controlled status transitions

- 🕒 append-only status history tracking

- 🛡️ centralized error handling

- 🧪 controller-level integration tests (MongoMemoryServer)

- 📏 strict TypeScript configuration (ESM)

This project prioritizes stability, data correctness, and intentional design — not feature churn.

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

## ✨ Core Capabilities

### 🔐 Authentication

- Secure user registration & login

- JWT token issuance

- Request-level user identity injection

- Ownership validation at query level

💼 Job Applications

- Create, list, update status, delete

- All operations are strictly user-scoped

- ObjectId validation and casting

- Controlled status enum enforcement

🕒 Status History (Audit Trail)

- Separate history collection

- Immutable, append-only records

- Captures:
  - previous status

  - new status

  - timestamp

- Only records actual transitions (no redundant writes)

🛡️ Cross-Cutting Architecture

- Centralized AppError abstraction

- Global error middleware

- Zod-based request validation layer

- Explicit separation: routes → controllers → models

- Typed Express request extension (req.userId)

---

## 🧪 Testing Strategy

- Controller-level integration tests

- In-memory MongoDB via mongodb-memory-server

- Real Mongoose models (no mocking)

- Tests cover:
  - authentication flow

  - user isolation

  - status transitions

  - history integrity

CI integration was attempted but is temporarily disabled due to ESM + Jest resolution inconsistencies between macOS and Linux environments.
The project will revisit CI after containerizing the environment.

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

## 🧠 Design Philosophy

This project deliberately prioritizes:

- 🧼 clarity over cleverness

- 🪨 stability over feature count

- 🧭 explicit behavior over abstractions

- 🔒 data isolation over convenience

- 🧱 modular structure over flat architecture

Several features are intentionally deferred to avoid premature complexity.

---

## 🗺️ Roadmap

Near Term

- 📄 Pagination & filtering for applications

- 📝 Notes / follow-ups feature

- 📊 Improved error branch test coverage

- 📘 OpenAPI / Swagger documentation

Mid Term

- 🧩 Service layer abstraction

- 🧾 Structured logging

- 🧰 Rate limiting

- 🐳 Dockerized development + CI

Long Term

- 🔁 Refresh token strategy

- 🛡️ Role-based access control (RBAC)

- 🚀 Production deployment configuration

---

# 👤 Author

Lalman
Early-career backend engineer focused on building stable, intentionally designed systems with strong ownership and architectural clarity.
