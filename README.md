# Team Task Manager

A full-stack MERN application for managing teams, projects, and tasks with authentication and role-based access control.

---

## 🚀 Features

- User Authentication (Signup/Login)
- JWT-based Authorization
- Role-Based Access Control
- Create & Manage Projects
- Create, Update & Delete Tasks
- Team Collaboration Workflow
- Responsive Frontend UI
- REST API Architecture
- MongoDB Database Integration
- Railway Deployment Ready

---

# 🛠️ Tech Stack

## Frontend
- React.js
- Vite
- CSS

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

## Deployment
- Railway

---

# 📂 Project Structure

```bash
Team-Task-Manager/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── .gitignore
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/Peesala-Naveen/Team-Task-Manager.git
```

---

## 2️⃣ Navigate to Project Folder

```bash
cd Team-Task-Manager
```

---

# 🔧 Backend Setup

## Navigate to Backend

```bash
cd backend
```

---

## Install Dependencies

```bash
npm install
```

---

## Create `.env` File

Create a `.env` file inside the `backend` folder.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## Start Backend Server

```bash
npm start
```

Backend runs on:

```bash
http://localhost:5000
```

---

# 💻 Frontend Setup

## Navigate to Frontend

```bash
cd frontend
```

---

## Install Dependencies

```bash
npm install
```

---

## Configure API URL

Open:

```bash
src/api.js
```

Update API URL:

```js
const API = "http://localhost:5000";
```

For production:

```js
const API = "https://your-backend-domain.up.railway.app";
```

---

## Start Frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# 🌐 Deployment

## Backend Deployment (Railway)

1. Create a Railway Project
2. Connect GitHub Repository
3. Set Root Directory:

```bash
/backend
```

4. Add Environment Variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

5. Generate Public Domain

---

## Frontend Deployment (Railway)

1. Add New Service in Same Railway Project
2. Connect Same GitHub Repository
3. Set Root Directory:

```bash
/frontend
```

4. Generate Public Domain
5. Use Port:

```bash
8080
```

---

# 🔐 Environment Variables

## Backend `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

# 📸 Screenshots

Add screenshots here after deployment.

Example:

```markdown
![Dashboard Screenshot](./screenshots/dashboard.png)
```

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature-name
```

3. Commit changes

```bash
git commit -m "Added new feature"
```

4. Push branch

```bash
git push origin feature-name
```

5. Open Pull Request

---

# 🧠 Future Improvements

- Real-time notifications
- Drag & Drop Kanban Board
- Team Chat Integration
- File Attachments
- Task Analytics Dashboard
- Email Notifications

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

## Peesala Naveen

- GitHub: https://github.com/Peesala-Naveen
- LinkedIn: https://linkedin.com/in/naveen-peesala-b41019301
- Email: naveenpeesala2004@gmail.com

---

# ⭐ Support

If you found this project useful, give it a ⭐ on GitHub.
