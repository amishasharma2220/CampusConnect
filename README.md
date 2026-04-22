 🚀 CampusConnect — DevOps Enabled Event Management Platform

CampusConnect is a full-stack web application designed for managing college events, enhanced with a complete **DevOps pipeline** including CI/CD automation, containerization, deployment, and monitoring.

---

## 🌐 Live Demo

🔗 **Deployed Application:**  
👉 https://campusconnect-1-dswf.onrender.com/

---

## 🌿 Overview

CampusConnect enables users to:

- Create and host events  
- Browse and register for events  
- Manage event details  

In addition to core functionality, this project demonstrates **industry-level DevOps practices** such as automated testing, continuous integration, deployment, and monitoring.

---

## 🧱 Tech Stack

### Frontend
- React (Vite)
- TypeScript
- Tailwind CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### DevOps Tools
- GitHub (Version Control)
- GitHub Actions (CI Pipeline)
- Jenkins (Automation Server)
- Docker (Containerization)
- Render (Cloud Deployment)
- UptimeRobot (Monitoring)
- ngrok (Webhook Tunneling)

---

## 🔄 DevOps Pipeline

Code Push → GitHub → Jenkins → Test → Build → Deploy → Monitor

### Continuous Integration (CI)
- Install dependencies  
- Run automated tests (Jest + Supertest)  
- Build frontend  

### Continuous Deployment (CD)
- Jenkins executes pipeline  
- Deployment triggered via Render webhook  

### Monitoring
- UptimeRobot checks application uptime  
- Sends alerts if service goes down  

---

## 🧪 Testing

- Framework: Jest  
- Type: API / Integration Testing  
- Tool: Supertest  

### Tested Features:
- User registration  
- Login functionality  
- Error handling  

---

## 🐳 Docker

- Backend and frontend are containerized  
- Ensures consistent environment across systems  
- Simplifies deployment  

---

## 🔗 Webhook Integration

- GitHub webhook triggers Jenkins automatically  
- ngrok used to expose local Jenkins server  

---

## 🚀 Deployment

- Hosted on Render  
- Automatic deployment via deploy hook  

---

## 📊 Monitoring

- Tool: UptimeRobot  
- Tracks uptime and availability  
- Sends alerts on failure  

---

## 📁 Project Structure

CampusConnect/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── frontend/
│   ├── src/
│   └── pages/
│
├── .github/workflows/ci.yml
├── Dockerfile
└── README.md

---

## ⚙️ How to Run Locally

### 1. Clone Repository

```bash
git clone https://github.com/your-username/CampusConnect.git
cd CampusConnect


⸻

2. Backend Setup

cd backend
npm install
npm run dev


⸻

3. Frontend Setup

cd frontend
npm install
npm run dev


⸻

4. Environment Variables

Create a .env file in backend:

MONGO_URI=your_mongodb_connection
PORT=5001
JWT_SECRET=your_secret


⸻

🚀 CI/CD Trigger

git commit --allow-empty -m "trigger pipeline"
git push


⸻

🎯 Features
	•	Full-stack event management system
	•	Automated CI/CD pipeline
	•	Docker containerization
	•	API testing with Jest
	•	Cloud deployment
	•	Real-time monitoring

⸻

🌸 Conclusion

This project demonstrates a complete DevOps lifecycle:

Development → Integration → Deployment → Monitoring

⸻

🔮 Future Scope
	•	Kubernetes integration
	•	Role-based authentication
	•	Notification system
	•	Advanced monitoring dashboards

⸻

👩‍💻 Author

Amisha Sharma
Manipal University Jaipur

⸻

📜 License

© 2026 Amisha Sharma. All Rights Reserved.

This project is protected under copyright law.
Unauthorized copying, distribution, modification, or use of this code, in whole or in part, is strictly prohibited without prior written permission from the author.

This project is submitted for academic and copyright purposes and is not open-source.








