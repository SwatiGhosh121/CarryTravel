# CarryTravel - Smart Trip Planner

CarryTravel is a full-stack web application designed to eliminate the stress of packing. It automatically builds a personalized travel checklist based on your destination, trip duration, and purpose, ensuring you never forget your essentials again.

## 🚀 Live Demo

*You can add your live deployment link here.*

## 🏗️ Architecture & Tech Stack

CarryTravel is built using the **MERN** Stack (MongoDB, Express, React, Node.js) and is split into two primary directories: `client` and `server`.

### Frontend (`/client`)
- **React.js** with Vite for lightning-fast development and optimized production builds.
- **Framer Motion** for smooth, modern micro-animations and page transitions.
- **React Router DOM** for client-side routing.
- **CSS3** with a custom design system and CSS Variables for styling.

### Backend (`/server`)
- **Node.js & Express.js** for handling API requests and routing.
- **MongoDB & Mongoose** for the database and object data modeling.
- **JSON Web Tokens (JWT)** for secure, stateless user authentication.
- **Bcryptjs** for secure password hashing.

---

## 🔀 Application Flow

### 1. Authentication Flow
- A user signs up using the `/signup` route. The backend hashes their password and stores their details in MongoDB.
- Upon successful login, the backend generates a **JWT (JSON Web Token)**.
- The frontend stores this token in `localStorage` and includes it in the `Authorization` header for all subsequent protected API requests.

### 2. Smart Planning Flow
1. **Input Details**: The user inputs their trip destination, duration, and type (Business, Leisure, Adventure, etc.) on the Planner page.
2. **Auto-Generation**: Based on the trip type, the application automatically suggests crucial items (e.g., suggesting a "Laptop" for Business trips).
3. **Database Sync**: Whenever a user adds a new item, toggles an item as "packed," or deletes an item, a REST API call (`POST`, `PUT`, `DELETE`) is made to the Express backend.
4. **Persistence**: The backend updates the specific task document in MongoDB ensuring the user's checklist is securely saved across sessions.

---

## ⚙️ Installation & Setup

To run this project locally, you will need two terminal windows—one for the client and one for the server.

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (running locally on port `27017` or a MongoDB Atlas URI)

### 1. Clone the repository
```bash
git clone https://github.com/SwatiGhosh121/CarryTravel.git
cd CarryTravel
```

### 2. Backend Setup
Open your first terminal window:
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory using the provided `.env.example`:
```env
PORT=8000
MONGODB_URI=mongodb://127.0.0.1:27017/carrytravel
JWT_SECRET=your_super_secret_jwt_key
```

Start the backend development server:
```bash
npm run dev
```
*The server will start on `http://localhost:8000`.*

### 3. Frontend Setup
Open your second terminal window:
```bash
cd client
npm install
```

Create a `.env` file in the `client` directory:
```env
VITE_API_URL=http://localhost:8000/api
```

Start the frontend development server:
```bash
npm run dev
```
*The client will start on `http://localhost:5173`.*

---

## 📁 Project Structure

```text
CarryTravel/
├── client/                     # React Frontend
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── components/         # Reusable UI components (Navbar, Footer, Home Sections)
│   │   ├── pages/              # Page views (Home, Login, Signup, Planner)
│   │   ├── index.css           # Global CSS and Design Tokens
│   │   └── App.jsx             # Main Application routing
│   └── vite.config.js          # Vite configuration
│
├── server/                     # Express Backend
│   ├── controllers/            # Request handlers (authController, taskController)
│   ├── middleware/             # Express middlewares (authMiddleware)
│   ├── models/                 # Mongoose schemas (User, Task)
│   ├── routes/                 # API route definitions
│   └── server.js               # Entry point & DB Connection
│
└── README.md                   # Project Documentation
```

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! 

## 📝 License
This project is open source and available under the [MIT License](LICENSE).
