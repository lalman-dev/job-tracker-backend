# Job Application Tracker – Backend

A backend service for tracking job applications, interview stages, and outcomes.

This project is being built as a **production-style backend** with a focus on:
- clean architecture
- authentication
- thoughtful data modeling
- real-world backend workflows

## Current Status
🚧 **Work in progress**

Core server setup and database connectivity are complete.  
Business logic and APIs are actively being developed.

## Tech Stack
- Node.js
- TypeScript (ESM)
- Express
- MongoDB Atlas
- Mongoose
- JWT Authentication

## Why MongoDB?
The project initially explored PostgreSQL + Prisma, but due to repeated local tooling and permission issues on macOS, the persistence layer was intentionally switched to MongoDB Atlas to ensure development stability and momentum.

The overall domain design and backend architecture remain database-agnostic.

## Getting Started (Dev)
```bash
npm install
npm run dev
```
### Server runs on:
http://localhost:8000

### Health Check:

GET /health

## Roadmap
  - User authentication (JWT)
  - Job application CRUD APIs
  - Status history tracking
  - Notes & follow-ups
  - Validation, error handling, and documentation
A detailed technical README will be added once the project is complete.