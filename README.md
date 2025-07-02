# 🚀 Todo App — Laravel + React

A clean, professional **Todo App** demonstrating good coding practices, modern tools, and thoughtful architecture.

---

## 📌 Tech Stack

- ⚙ **Laravel 11**
- 🔐 **Sanctum (token-based API authentication)**
- 🎨 **React + Tailwind CSS (Vite)**
- 📡 **Axios (API communication with Bearer token)**
- 🏛 **Repository + Service design pattern**
- 📋 **Form Request validation (Laravel policies)**
- 🧪 **Factories + Seeders (test data)**

---

## 🗂 Project Structure

```
/todo-app
  ├── /backend      # Laravel 11 API
  └── /frontend     # React + Tailwind SPA (Vite)
```

---

## 💻 Backend Overview (Laravel)

### Features

✅ **Sanctum API auth** — secure token-based login  
✅ **Form Requests** — clean validation policies  
✅ **Repository + Service pattern** — logic separated from controllers  
✅ **Factories + Seeders** — demo data for testing  
✅ **CORS setup** — allows React (localhost:5173) to connect  
✅ **RESTful API endpoints**

### API Endpoints

| Method | Endpoint          | Description                                                 |
| ------ | ----------------- | ----------------------------------------------------------- |
| POST   | `/api/register`   | Register a new user (name, email, password, image optional) |
| POST   | `/api/login`      | Login user — returns access token                           |
| POST   | `/api/logout`     | Logout user (requires token)                                |
| GET    | `/api/todos`      | List all todos (auth required)                              |
| POST   | `/api/todos`      | Add a todo                                                  |
| PUT    | `/api/todos/{id}` | Update a todo                                               |
| DELETE | `/api/todos/{id}` | Delete a todo                                               |

---

## ⚛️ Frontend Overview (React)

### Features

✅ **Register / Login forms**  
✅ **Save token in `localStorage`**  
✅ **Axios auto-sends Bearer token**  
✅ **Todos: list, add, edit, mark complete, delete**  
✅ **React Router protected routes**  
✅ **Tailwind CSS (light/dark mode)**  
✅ **Button hover:** bg switches to section color, border + text stay indigo, cursor pointer
✅ **Hide completed tasks:** button that hide completed tasks and it is only active when there is a completed task

---

## 🎨 UI Highlights

- Fully responsive
- Dark / light mode (Tailwind `dark:` support)
- Accessible forms
- Clean hover transitions on buttons

---

## 🛠 Installation

### Backend (Laravel)

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

✅ Factories + seeders will auto-generate sample todos

---

### Frontend (React Vite)

```bash
cd frontend
npm install
npm run dev
```

✅ Runs on `http://localhost:5173`

---

## 🔑 Authentication Flow

1️⃣ React sends email + password to `/api/login`  
2️⃣ Receives `access_token` (Bearer token)  
3️⃣ Saves token in `localStorage`  
4️⃣ Axios sends token automatically in `Authorization` header  
5️⃣ Protected routes restrict unauthenticated access

---

## 📂 Example Repo Layout

```
/backend
  /app
    /Http/Controllers
    /Http/Requests        # Form Request validation
    /Repositories         # Repository pattern
    /Services             # Business logic
    /Models
    /Database/Seeders     # Factories + seeders
  /routes
  /config
  /database
  ...

/frontend
  /src
    /components
    /pages
    /routes
    /services (api.js)
    App.js
    main.jsx
```

---

## ✅ Best Practices Applied

- **Clean commit history** (logical steps, clear messages)
- **Code separation** (controllers thin, logic in services)
- **Validation via Form Request classes**
- **Test data via seeders & factories**
- **Secure API with Sanctum**
- **Reusable React components + clean Axios integration**

---

## ✉ Author

👤 **Karim Shaheen**

---

## 📝 Notes

- Built as a coding task to demonstrate solid Laravel + React architecture
- Designed for easy extensibility + maintainability
- Codebase follows clean architecture principles

---
