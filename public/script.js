const socket = io();
let bookingsArray = [];

const bookingsContainer = document.getElementById("bookings-list");
const noMsg = document.getElementById("noBookingsMessage");
const venueFilter = document.getElementById("venueFilter");

let notificationSound;

document.getElementById("enableSoundBtn").addEventListener("click", () => {
  notificationSound = new Audio("/sounds/notification.mp3");
  notificationSound.play();
});

socket.on("connect", () => {
  console.log(" Connected to server");
});

function updateStats() {
  if (bookingsArray.length === 0) {
    document.getElementById("popularVenue").textContent = "—";
    document.getElementById("avgPartySize").textContent = "—";
    document.getElementById("totalBookings").textContent = "0";
    document.getElementById("lastBookingTime").textContent = "—";
    return;
  }

  const venueCounts = {};
  bookingsArray.forEach((b) => {
    const venue = b.venueName || "Unknown";
    venueCounts[venue] = (venueCounts[venue] || 0) + 1;
  });
  const popularVenue =
    Object.entries(venueCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";

  const totalSize = bookingsArray.reduce((acc, b) => acc + b.partySize, 0);
  const avgSize = (totalSize / bookingsArray.length).toFixed(1);

  const today = new Date().toISOString().slice(0, 10);

  const totalToday = bookingsArray.filter((b) => b.time === today).length;

  const lastBooking = bookingsArray[bookingsArray.length - 1];
  const lastTime = lastBooking.time;

  document.getElementById("popularVenue").textContent = popularVenue;
  document.getElementById("avgPartySize").textContent = avgSize;
  document.getElementById("totalBookings").textContent = totalToday;
  document.getElementById("lastBookingTime").textContent = lastTime;
}

socket.on("initial-bookings", (initial) => {
  bookingsArray = initial;
  renderFilteredBookings();
});

socket.on("new-booking", (booking) => {
  bookingsArray.push(booking);
  if (notificationSound) {
    notificationSound.play();
  }

  renderFilteredBookings();
});

document.getElementById("clearBtn").addEventListener("click", () => {
  if (confirm("Are you sure you want to clear all bookings?")) {
    socket.emit("clearBookings");
  }
});

function renderFilteredBookings() {
  if (bookingsArray.length === 0) {
    bookingsContainer.innerHTML =
      "<p class='text-gray-500'>No bookings yet.</p>";
    updateCharts([]);
    updateStats();
    return;
  }

  const venue = venueFilter.value;
  bookingsContainer.innerHTML = "";

  const filtered = bookingsArray.filter((b) => !venue || b.venueName === venue);

  if (filtered.length === 0) {
    noMsg.style.display = "block";
    return;
  }

  noMsg.style.display = "none";

  filtered.reverse().forEach((b) => {
    const card = document.createElement("div");
    card.className =
      "bg-white p-4 rounded-lg shadow-md border-l-4 border-indigo-500";

    card.innerHTML = `
      <div class="text-sm text-gray-500 mb-1">Booking #${b.id}</div>
      <div class="font-semibold text-lg">${b.venueName || "—"}</div>
      <div class="text-gray-600">Party of <strong>${b.partySize}</strong></div>
      <div class="text-gray-500 text-sm">${b.time}</div>
    `;

    bookingsContainer.appendChild(card);
  });

  updateStats();
  updateCharts(bookingsArray);
}

venueFilter.addEventListener("change", renderFilteredBookings);
