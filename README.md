# 💼 Career Vedanta – MERN Job Portal

Career Vedanta is a full-stack job portal built using the MERN stack, designed to connect job seekers and recruiters on a unified platform. It enables seamless job discovery, application tracking, and efficient job posting and candidate management.

---

## 📌 Key Features

### 👨‍💼 Job Seeker Features

* User registration and secure login
* Browse and search job listings
* Apply for jobs in real-time
* Track applied job history
* JWT-based authentication

---

### 🏢 Recruiter Features

* Post new job opportunities
* Edit and delete job listings
* Manage job applications
* View and evaluate candidate profiles

---

### 🔐 Authentication & Security

* JWT-based authentication system
* Role-based protected routes
* Secure API handling and data flow
* Password encryption (bcrypt recommended)

---

## 🛠️ Tech Stack

### Frontend

* React.js
* HTML5, CSS3, JavaScript

### Backend

* Node.js
* Express.js

### Database

* MongoDB

### Authentication

* JSON Web Token (JWT)

### Deployment

* Vercel (Frontend)
* *(Recommended)* Render / Railway (Backend)
* MongoDB Atlas (Database)

---

## 🏗️ System Architecture

User (Job Seeker / Recruiter)
    ⬇
Frontend (React)
    ⬇
Backend (Node.js + Express)
    ⬇
Database (MongoDB)

---

## 📂 Project Structure

```id="yqls6r"
Career-Vedanta
│
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   └── server.js
│
├── frontend
│   ├── components
│   ├── pages
│   ├── services
│   └── App.js
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```id="b1ajk8"
git clone https://github.com/aditiisinghh/Career-Vedanta.git
cd Career-Vedanta
```

---

### 2️⃣ Backend Setup

```id="mqz7rd"
cd backend
npm install
npm start
```

Runs on:
👉 http://localhost:5000

---

### 3️⃣ Frontend Setup

```id="0d8t0c"
cd frontend
npm install
npm start
```

Runs on:
👉 http://localhost:3000

---

## 🔮 Future Enhancements

* 📄 Resume upload & parsing system
* 🔍 Advanced job search filters (location, salary, skills)
* 📧 Email notifications for job updates
* 🧑‍💼 Admin dashboard for platform monitoring
* 📅 Interview scheduling system

---

## 🤝 Contributing

Contributions are welcome!
Feel free to fork the repository and submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👩‍💻 Author

**Aditi Singh**

🔗 GitHub: https://github.com/aditiiisinghh

---

## 💡 Highlights

* Developed a full-stack job portal using MERN stack
* Implemented JWT-based authentication and role-based access
* Designed scalable backend architecture with modular structure
* Enabled real-time job application and management workflows
