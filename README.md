# 📡 Real-Time Booking Dashboard

A full-stack web application that uses **Socket.IO** to simulate and visualize real-time bookings across venues. This project demonstrates real-time communication between a Node.js backend and a live-updating frontend, including charts and live stats.

---

## 📦 Tech Stack

- **Backend**: Node.js, Express, Socket.IO  
- **Frontend**: HTML, CSS (Tailwind), JavaScript  
- **Visualization**: Chart.js  

---

## 🚀 Features

- 📡 Real-time updates using WebSockets  
- 📊 Live analytics: most booked venue, average party size trend  
- 🔊 Sound alert on new bookings  
- 🧠 Dashboard stats (total bookings, last booking time)  
- 🧹 One-click "Clear Bookings" button  
- 🎨 Fully responsive with Tailwind CSS  
- 🔁 Multi-tab synchronization (same data reflected live)  

---

## 🛠️ Installation & Setup

### ✅ Prerequisites

- Node.js and npm installed on your system.

### 📥 Step 1: Clone the Repository

```bash
git clone https://github.com/tanu-agarwal0101/live-booking-dashboard.git
cd live-booking-dashboard
```

### 📦 Step 2: Install Server Dependencies

```bash
npm install
```

### 🚀 Step 3: Run the Server

```bash
node server.js
```

By default, the server runs on:

```
http://localhost:3000
```

This serves both the backend API and the frontend files from the `public/` folder.

---

## 📁 Project Structure

```
📁 live-booking-dashboard/
├── public/                 # Frontend assets
│   ├── index.html
│   ├── script.js
│   ├── charts.js
│   └── sounds/
│       └── notification.mp3
├── server.js               # Backend server 
├── package.json
├── .gitignore
└── README.md
```

---

## ⚙️ How It Works

### 🔁 Full-Stack Integration

- The **Node.js server** (`server.js`) sets up both an HTTP server and a WebSocket server using **Socket.IO**.
- The **frontend** connects to this WebSocket to send and receive real-time booking data.
- Any booking created in one browser tab updates all other tabs live.

### 📡 Real-Time Booking Flow

1. Client emits `newBooking` with details (venue, party size, time).
2. Server receives the booking and broadcasts `bookingUpdate` to all clients.
3. Each client updates:
   - Total bookings
   - Last booking time
   - Live charts (via Chart.js)
   - Popular venue stats
   - Plays notification sound

---


## 🧼 .gitignore

```
node_modules/
.env
.DS_Store
```

---

## 🧪 Test Instructions

1. Run the server: `node server.js`  
2. Open `http://localhost:3000` in two or more tabs  
3. Watch all open tabs update live with sound + stats update  
4. Use "Clear Bookings" to reset dashboard in real-time

---

## 📩 Contact

Built by [Tanu Agarwal](https://github.com/tanu-agarwal0101)  
