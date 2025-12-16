# Mini Tasks App – Full Stack Assignment

This repository contains a **full-stack Tasks application** built as part of a technical assignment.

The project includes:

- A **Node.js + Express backend** with a SQL database
- A **React frontend** consuming the backend API
- Basic CRUD operations, pagination, and filtering
- Clean separation of concerns and modular structure

---

## 🧱 Tech Stack

### Backend

- Node.js + Express
- Prisma ORM
- SQLite (for local development)
- ES Modules
- REST API

### Frontend

- React (Vite)
- Tailwind CSS
- Axios
- Functional components + hooks

---

## 📁 Repository Structure

```
.
├── backend/    # Node.js + Express API
└── frontend/   # React frontend
```

Each folder is independently runnable.

---

## 🔐 Authentication

Authentication is intentionally simplified.

A fake auth middleware is used on the backend:

- Every request is treated as coming from a seeded user (`id = 1`)
- This keeps the focus on task functionality rather than auth

---

## 🚀 Running the Project Locally

### 1️⃣ Clone the repository

```bash
git clone <repo-url>
cd <repo-name>
```

---

## ▶️ Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
DATABASE_URL="file:./dev.db"
PORT=3000
```

Run database migrations:

```bash
npx prisma migrate dev
```

Seed the database:

```bash
npx prisma db seed
```

Start the backend server:

```bash
npm run dev
```

Backend will run at:

```
http://localhost:3000
```

---

## ▶️ Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend will run at:

```
http://localhost:5173
```

---

## 📌 API Overview

All API routes are prefixed with `/api`.

### Endpoints

- `GET /api/tasks` – List tasks (filters + pagination)
- `POST /api/tasks` – Create a new task
- `PATCH /api/tasks/:id/status` – Update task status

Tasks belong to the currently logged-in (fake) user.

---

## ✅ Features Implemented

- Task creation and listing
- Search by title
- Filter by status
- Pagination (limit & offset)
- Status updates (OPEN → IN_PROGRESS → DONE)
- Loading and error states
- Clean UI with Tailwind CSS

---

## 📝 Notes

- SQLite is used for simplicity and quick setup
- Prisma handles schema, migrations, and queries
- Code focuses on clarity, correctness, and structure

---

## 📸 Optional

- Prisma Studio can be used to inspect the database:

  ```bash
  npx prisma studio
  ```

---

## ✅ Final Remarks

This project demonstrates:

- Clean full-stack architecture
- Proper separation of concerns
- RESTful API design
- Practical React state management
- Production-quality code within a limited scope

---
