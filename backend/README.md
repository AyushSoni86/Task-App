# Backend – Tasks API

This backend is a **Node.js + Express** REST API for a simple Tasks application.
It uses a **SQL database (SQLite)** with **Prisma ORM**, follows a **clean layered architecture**, and simulates authentication using a fake auth middleware.

---

## 🧱 Architecture Overview

The backend is organized using clear separation of concerns:

```
src/
├── routes/        # Express route definitions
├── controllers/   # HTTP request/response handlers
├── services/      # Business logic & validation
├── models/        # Database access (Prisma queries)
├── middlewares/   # Auth, error handling, 404
├── config/        # DB client configuration
├── app.js         # Express app setup
└── server.js      # App entry point
```

### Request Flow

```
Request
 → Fake Auth Middleware (sets req.user)
 → Route
 → Controller
 → Service
 → Model (Prisma)
 → Database
 → Response
```

All database queries are **centralized in the models layer**, as required.

---

## 🔐 Authentication (Fake Auth)

Authentication is intentionally simplified.

A middleware sets a hardcoded user:

```js
req.user = { id: 1, email: "demo@example.com" };
```

A default user with `id = 1` is seeded into the database.

This keeps the data model realistic without implementing real auth.

---

## 🗄️ Database Schema

The application uses two tables: `Users` and `Tasks`.

### SQL Schema

```sql
-- CreateTable
CREATE TABLE "Users" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "email" TEXT NOT NULL,
  "full_name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Tasks" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "user_id" INTEGER NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "status" TEXT NOT NULL DEFAULT 'OPEN',
  "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Tasks_user_id_fkey"
    FOREIGN KEY ("user_id") REFERENCES "Users" ("id")
    ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
```

### Notes

- Each task belongs to a user (`user_id` foreign key)
- `status` is constrained at the application layer to:

  - `OPEN`
  - `IN_PROGRESS`
  - `DONE`

- `created_at` is automatically set by the database

---

## 📌 API Endpoints

All routes are prefixed with `/api`.

### GET `/api/tasks`

Returns tasks belonging to the current user.

**Query Params (optional):**

- `status`: `OPEN | IN_PROGRESS | DONE`
- `q`: substring search on title
- `limit`: pagination limit (default: 10, max: 50)
- `offset`: pagination offset (default: 0)

**Response:**

```json
{
  "success": true,
  "meta": {
    "total": 17,
    "limit": 10,
    "offset": 0
  },
  "data": []
}
```

---

### POST `/api/tasks`

Creates a new task for the current user.

**Body:**

```json
{
  "title": "Workout",
  "description": "Leg day"
}
```

**Behavior:**

- `status` is set to `OPEN`
- `created_at` is set automatically

---

### PATCH `/api/tasks/:id/status`

Updates task status.

**Body:**

```json
{
  "status": "IN_PROGRESS"
}
```

**Rules:**

- Only tasks belonging to the current user can be updated
- Returns `404` if task does not exist or is not owned

---

## ⚠️ Error Handling

Global error middleware ensures consistent error responses:

```json
{
  "success": false,
  "message": "Error description"
}
```

A dedicated 404 handler returns a JSON response for unknown routes.

---

## 🚀 Running Locally

### 1️⃣ Install dependencies

```bash
cd backend
npm install
```

---

### 2️⃣ Environment variables

Create `.env` file:

```env
DATABASE_URL="file:./dev.db"
PORT=3000
```

---

### 3️⃣ Run database migrations

```bash
npx prisma migrate dev
```

---

### 4️⃣ Seed the database

```bash
npx prisma db seed
```

This creates a default user:

```
id: 1
email: demo@example.com
full_name: Demo User
```

---

### 5️⃣ Start the server

```bash
npm run dev
```

The API will be available at:

```
http://localhost:3000
```

---

## 🧪 Useful Commands

```bash
npx prisma studio      # View database in browser
npx prisma migrate reset  # Reset DB (dev only)
```

---
