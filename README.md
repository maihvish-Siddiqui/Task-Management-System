# 📋 Task Management System

A full-stack Task Management web application built using HTML, CSS, JavaScript, Node.js, Express, and MongoDB. This app allows users to create, update, delete, and manage tasks with authentication support.

---

## 🚀 Live Demo
Frontend: https://task-management-system-lime-three.vercel.app/ 
Backend: https://task-management-system-o1r2.onrender.com 

---

## ✨ Features
- Add new tasks  
- Update tasks  
- Delete tasks  
- Mark tasks as completed/pending  
- User authentication (JWT)  
- REST API integration  
- Responsive UI  

---

## 🛠 Tech Stack
Frontend: HTML, CSS, JavaScript  
Backend: Node.js, Express.js  
Database: MongoDB Atlas  
Authentication: JWT  

---

## 📁 Project Structure
task-management-system/
│── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── db.js
│   └── server.js
│
│── frontend/
│   ├── index.html
│   ├── css/
│   ├── js/
│
└── README.md

---

## ⚙️ Setup Instructions

### Clone repository
git clone https://github.com/maihvish-Siddiqui/task-management-system.git

### Backend setup
cd backend  
npm install  

Create .env file:
PORT=5000  
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_secret_key  

Run backend:
npm start  

---

### Frontend setup
Open frontend/index.html in browser OR use Live Server

---

## 🔗 API Endpoints
GET /api/tasks - Get all tasks  
POST /api/tasks - Create task  
PUT /api/tasks/:id - Update task  
DELETE /api/tasks/:id - Delete task  

---

## 🚀 Deployment
Frontend hosted on Vercel  
Backend hosted on Render  
Database on MongoDB Atlas  

---

## 👩‍💻 Author
Name: Your Name  
GitHub: https://github.com/maihvish-Siddiqui
LinkedIn: https://linkedin.com/in/maihvish09  

---

⭐ If you like this project, give it a star!
