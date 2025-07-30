import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));

const bookings = [];
let bookingId = 1;

function getRandomFutureDate(daysAhead = 10) {
  const today = new Date();
  const offset = Math.floor(Math.random() * daysAhead);
  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + offset);
  return futureDate.toLocaleDateString("en-IN");
}

setInterval(() => {
  const venues = [
    "Shahi Rasoi",
    "Rang Mahal",
    "Claires",
    "Radissons",
    "Taj Hotel",
  ];
  const newBooking = {
    id: bookingId++,
    venueName: venues[Math.floor(Math.random() * venues.length)],
    partySize: Math.floor(Math.random() * 20) + 1,
    time: getRandomFutureDate(5),
    createdAt: new Date().toISOString(),
  };

  bookings.push(newBooking);
  io.emit("new-booking", newBooking);
}, 5000);

io.on("connection", (socket) => {
  console.log("Client connected");
  socket.emit("initial-bookings", bookings);

  socket.on("clearBookings", () => {
    console.log("Clearing all bookings requested by client.");
    bookings.length = 0;
    io.emit("initial-bookings", bookings);
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
