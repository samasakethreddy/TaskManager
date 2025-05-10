# Task Manager

A task management application built with **Golang** (Gin Framework) for the backend and **React** (Vite) for the frontend. The application allows users to register, log in, and manage tasks with CRUD operations, all secured with JWT-based authentication.

---

## 🚀 Tech Stack

### **Backend**:

- **Language**: Go (Golang)
- **Framework**: Gin
- **Database**: MySQL (hosted on AWS RDS)
- **ORM**: GORM (Object Relational Mapping)
- **Authentication**: JWT (JSON Web Token)
- **Password Hashing**: bcrypt
- **Middleware**: CORS and Authentication

### **Frontend**:

- **Language**: JavaScript (React)
- **Build Tool**: Vite (fast build tool for modern JavaScript apps)
- **UI Framework**: Bootstrap 5
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **State Management**: React Hooks (`useState`, `useEffect`, ...)
- **Authentication**: JWT stored in `localStorage`

---

## 📝 Features

### **Backend**:
- User **Authentication** (register/login with JWT)
- **JWT Protected Routes** for secure task management
- **Task CRUD Operations**:
  - **Create** a new task
  - **Read** all tasks for the logged-in user
  - **Update** a specific task
  - **Delete** a task
- Password storage and validation using **bcrypt**
- **MySQL Database** hosted on **AWS RDS** with GORM as the ORM
- Modular folder structure for easy scalability
- **CORS** handling for frontend-backend communication

### **Frontend**:
- **Login/Registration Pages** for user authentication
- **Dashboard** showing the user's tasks
- **Task Management Form** for creating and editing tasks
- Tasks are **retrieved, displayed, edited, and deleted** using the backend API
- **Token-based route protection**: JWT is checked before accessing protected routes
- Simple and responsive UI using **Bootstrap 5**
- Error handling for expired or missing tokens, redirecting the user to the login page

---

## 📡 API Endpoints

### **Authentication**:

- **POST** `/register` — Register a new user
    - **Body**: `{ "username": "user", "password": "password123" }`
    - **Response**: `{ "message": "User registered successfully" }`

- **POST** `/login` — Login and get JWT token
    - **Body**: `{ "username": "user", "password": "password123" }`
    - **Response**: `{ "token": "jwt-token-here" }`

### **Task Management**:

- **GET** `/tasks` — Get all tasks for the logged-in user
    - **Headers**: `Authorization: Bearer <token>`
    - **Response**: List of tasks for the user.

- **POST** `/tasks` — Create a new task
    - **Body**: `{ "title": "Task Title", "description": "Task Description", "status": "pending", "due_date": "2025-05-12T00:00:00Z" }`
    - **Response**: `{ "id": 1, "title": "Task Title", "description": "Task Description", "status": "pending", "due_date": "2025-05-12T00:00:00Z" }`

- **PUT** `/tasks/:id` — Update an existing task
    - **Body**: `{ "title": "Updated Task Title", "description": "Updated Task Description", "status": "in-progress", "due_date": "2025-05-14T00:00:00Z" }`
    - **Response**: Updated task object.

- **DELETE** `/tasks/:id` — Delete a task
    - **Response**: `{ "message": "Task deleted successfully" }`

---

## 🗂️ Folder Structure

### Backend:

- **config/** – Database configuration and environment variables
- **controllers/** – Handlers for API requests
- **models/** – GORM database models
- **middleware/** – Authentication and CORS middleware
- **routes/** – Route definitions
- **utils/** – Utility functions (e.g., JWT generation)

### Frontend:

- **src/pages/** – React pages (Login, Register, Dashboard)
- **src/components/** – Reusable components (TaskForm, Navbar)
- **src/services/** – Axios instance for API calls
- **src/App.jsx** – Main React app with routing logic
