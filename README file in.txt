assets/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── styles/
│ │ ├── api.js
│ │ ├── App.jsx
│ │ └── main.jsx
│ │
│ ├── package.json
│ └── vite.config.js

└── .gitignore

⚙️ Installation & Setup
1️⃣ Clone the Repository

git clone https://github.com/Peesala-Naveen/Team-Task-Manager.git

2️⃣ Navigate to Project Folder

cd Team-Task-Manager

🔧 Backend Setup
Navigate to Backend

cd backend

Install Dependencies

npm install

Create .env File

Create a .env file inside the backend folder.

Example:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Start Backend Server

npm start

Backend runs on:

http://localhost:5000

💻 Frontend Setup
Navigate to Frontend

cd frontend

Install Dependencies

npm install

Configure API URL

Open:

src/api.js

Update API URL:

const API = "http://localhost:5000
";

For production:

const API = "https://your-backend-domain.up.railway.app
";

Start Frontend

npm run dev

Frontend runs on:

http://localhost:5173

🌐 Deployment
Backend Deployment (Railway)
Create a Railway Project
Connect GitHub Repository
Set Root Directory:

/backend

Add Environment Variables:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Generate Public Domain
Frontend Deployment (Railway)
Add New Service in Same Railway Project
Connect Same GitHub Repository
Set Root Directory:

/frontend

Generate Public Domain
Use Port:

8080

🔐 Environment Variables
Backend .env

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

📸 Screenshots

Add screenshots here after deployment.

Example:

🤝 Contributing

Contributions are welcome.

Fork the repository
Create a new branch

git checkout -b feature-name

Commit changes

git commit -m "Added new feature"

Push branch

git push origin feature-name

Open Pull Request
🧠 Future Improvements
Real-time notifications
Drag & Drop Kanban Board
Team Chat Integration
File Attachments
Task Analytics Dashboard
Email Notifications
📄 License

This project is licensed under the MIT License.

👨‍💻 Author
Peesala Naveen

GitHub: https://github.com/Peesala-Naveen

LinkedIn: https://linkedin.com/in/naveen-peesala-b41019301

Email: naveenpeesala2004@gmail.com

⭐ Support

If you found this project useful, give it a ⭐ on GitHub.