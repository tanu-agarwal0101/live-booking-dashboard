let venueChart, avgPartySizeChart;

function updateCharts(bookings) {
  const venueCount = {};
  bookings.forEach((b) => {
    const v = b.venueName || "Unknown";
    venueCount[v] = (venueCount[v] || 0) + 1;
  });

  const venueLabels = Object.keys(venueCount);
  const venueData = Object.values(venueCount);

  if (venueChart) venueChart.destroy();
  const venueCtx = document.getElementById("venueChart").getContext("2d");
  venueChart = new Chart(venueCtx, {
    type: "bar",
    data: {
      labels: venueLabels,
      datasets: [
        {
          label: "Bookings per Venue",
          data: venueData,
          backgroundColor: "#4d4fe2ff",
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
      },
      scales: {
        y: { beginAtZero: true },
      },
    },
  });

  const dateGroups = {};
  bookings.forEach((b) => {
    if (!dateGroups[b.time]) {
      dateGroups[b.time] = [];
    }
    dateGroups[b.time].push(b.partySize);
  });

  const dateLabels = Object.keys(dateGroups).sort();
  const avgSizes = dateLabels.map((date) => {
    const sizes = dateGroups[date];
    return sizes.reduce((a, b) => a + b, 0) / sizes.length;
  });

  if (avgPartySizeChart) avgPartySizeChart.destroy();
  const trendCtx = document
    .getElementById("avgPartySizeChart")
    .getContext("2d");
  avgPartySizeChart = new Chart(trendCtx, {
    type: "line",
    data: {
      labels: dateLabels,
      datasets: [
        {
          label: "Avg Party Size",
          data: avgSizes,
          fill: false,
          borderColor: "#10B981",
          tension: 0.3,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true },
      },
    },
  });
}
