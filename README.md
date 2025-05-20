

# 📝 Blog Application

This is a full-stack blog application built with **React** for the frontend, **Node.js + Express** for the backend, and **MongoDB** as the database. It supports blog creation, editing, publishing, auto-saving drafts, and more.

---



## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Druva4444/Blogger.git

```

---

### 2. Backend Setup

```bash
cd backend
```

#### 🔧 Create a `.env` file with the following content:

```
PORT=
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/bloging
JWT_SECRET=
```

#### 📦 Install backend dependencies:

```bash
npm install
```

#### ▶️ Start the backend server:

```bash
npm start
# Or with nodemon (for auto-reload)
# npx nodemon index.js
```

---

### 3. Frontend Setup

Open a **new terminal window**:

```bash
cd frontend
```

#### 📦 Install frontend dependencies:

```bash
npm install
```

#### ▶️ Start the frontend development server:

```bash
npm start
```

The frontend should now be running at:  
`http://localhost:5173` 

---

## ✨ Features

- ✍️ Rich text editing with **TipTap**
- 💾 Auto-save every 30 seconds and after 5 seconds of inactivity
- 📄 Draft and publish modes
- 🔒 JWT-based authentication
- 💬 Alert messages on save/publish
- 📂 Organized frontend/backend structure

---

## 🛠️ Tech Stack

- **Frontend:** React, TipTap, Axios, Lucide Icons,React-Router
- **Backend:** Node.js, Express, MongoDB, Mongoose,JWTToken
- **Editor:** TipTap with StarterKit
- **Auth:** JWT

---

## 📬 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---


