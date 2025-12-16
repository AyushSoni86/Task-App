Perfect 👍
Here’s a **short, clear, interview-ready frontend documentation** you can drop straight into your main `README.md` or a `frontend/README.md`.

It explains **what the frontend does**, **how it’s structured**, and **how to run it locally**—without over-explaining.

---

# Frontend – Tasks App

This frontend is a **React + Tailwind CSS** application that consumes the Tasks API.
It provides a clean, intuitive UI for managing tasks with **search, filtering, pagination, and status updates**.

---

## 🧱 Tech Stack

- **React** (Vite)
- **Tailwind CSS** – styling
- **Axios** – API communication
- **ES Modules**
- **Functional components + hooks**

---

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── Pagination.jsx
│   ├── SearchBar.jsx
│   ├── RecordPerPageSelector.jsx
│   ├── SearchBar.jsx
│   ├── StatusBadge.jsx
│   ├── StatusFilter.jsx
│   ├── TaskForm.jsx
│   └── TaskTable.jsx
├── pages/
│   └── TaskApp.jsx
├── App.jsx
└── main.jsx
```

## 🖥️ Features

- View tasks in a table
- Search tasks by title
- Filter by status (Open / In Progress / Done)
- Pagination using limit & offset
- Create new tasks
- Advance task status (OPEN → IN_PROGRESS → DONE)
- Loading and error states

---

## 🔄 Data Flow

```
User Action
 → Update React State
 → fetchTasks()
 → Axios → Backend API
 → Update UI
```

The frontend relies on the backend API response shape:

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

## 📅 Date Handling

Dates returned by the API are in ISO format:

```json
"createdAt": "2025-12-15T17:24:14.056Z"
```

They are formatted in the UI using:

```js
new Date(task.createdAt).toLocaleString("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
});
```

---

## 🚀 Running Locally

### 1️⃣ Install dependencies

```bash
cd frontend
npm install
```

---

### 2️⃣ Start the development server

```bash
npm run dev
```

The app will be available at:

```
http://localhost:5173
```

> Ensure the backend is running on `http://localhost:3000`

---

## ⚙️ API Configuration

Axios is configured with a base URL:

```js
baseURL: "http://localhost:3000/api";
```

This can be moved to an environment variable if needed.

---

## ✅ Summary

- Clean, modular React frontend
- Matches backend API contract
- Uses controlled components
- Handles loading, errors, and pagination
- Simple, readable, and easy to extend

---
