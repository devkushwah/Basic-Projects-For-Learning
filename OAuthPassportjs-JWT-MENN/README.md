# Next.js Full Stack Authentication App

This is a full-stack authentication system built using Next.js, Express.js, MongoDB, and Node.js. It supports both OAuth 2.0 (Google login) and traditional JWT-based authentication.

## 🚀 Features
- **User Authentication** (Signup/Login using JWT)
- **OAuth 2.0 Google Authentication**
- **Session Management**
- **Protected Routes**
- **MongoDB Database Integration**
- **Express.js API for Backend**
- **Next.js API Routes**
- **Secure Password Hashing (bcrypt)**

## 🛠️ Tech Stack
- **Frontend:** Next.js, React
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ORM)
- **Authentication:** JWT (JSON Web Token), Google OAuth 2.0
- **Styling:** Tailwind CSS (optional)

---

## 📂 Folder Structure
```
📦 your-project-name
├── 📂 client (Next.js frontend)
│   ├── pages/
│   ├── components/
│   ├── styles/
│   ├── utils/
├── 📂 server (Express.js backend)
│   ├── models/ (Mongoose Schemas)
│   ├── routes/ (Express routes)
│   ├── controllers/ (Business logic)
│   ├── config/ (DB connection, env config)
│   ├── middleware/ (Auth middlewares)
│   ├── index.js
├── .env (Environment variables)
├── .gitignore
├── package.json
├── README.md
```

---

## 🔧 Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/your-project-name.git
cd your-project-name
```

### 2️⃣ Install Dependencies
```sh
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

### 3️⃣ Setup Environment Variables
Create a `.env` file in the `server/` directory and add:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 4️⃣ Run the Project
```sh
# Start Backend Server
cd server
npm run dev

# Start Frontend (Next.js)
cd client
npm run dev
```
Then, open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📌 API Endpoints
| Method | Endpoint | Description |
|--------|----------|------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | Login user with JWT |
| GET | `/api/auth/google` | Google OAuth Login |
| GET | `/api/user/profile` | Fetch user profile (Protected) |

---

## ✨ Future Enhancements
- Add **Password Reset** functionality
- Implement **Role-Based Authentication** (Admin/User)
- Improve UI with Tailwind CSS or Material-UI
- Deploy on **Vercel (Frontend)** & **Render/Heroku (Backend)**

---

## 🏆 Contributing
Feel free to contribute by submitting a pull request or opening an issue!

---

## 📜 License
This project is open-source and available under the [MIT License](LICENSE).

