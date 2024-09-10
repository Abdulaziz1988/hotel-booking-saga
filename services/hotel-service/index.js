const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const PORT = 3003;

const hotels = {
  1: { name: "Luxury Hotel", price: 200 },
  2: { name: "Budget Inn", price: 80 },
};

const bookings = {};

app.post("/check-availability", (req, res) => {
  const { hotelId, dates } = req.body;

  if (!hotels[hotelId]) {
    return res.status(404).json({ available: false, error: "Hotel not found" });
  }

  // Simulate availability check
  const available = Math.random() < 0.7; // 70% availability

  res.json({ available, price: hotels[hotelId].price });
});

app.post("/confirm-booking", (req, res) => {
  const { hotelId, dates, userId } = req.body;

  if (!hotels[hotelId]) {
    return res.status(404).json({ success: false, error: "Hotel not found" });
  }

  const bookingId = Date.now();
  bookings[bookingId] = { hotelId, dates, userId };

  res.json({ success: true, bookingId });
});

app.post("/cancel-booking", (req, res) => {
  const { bookingId } = req.body;

  if (!bookings[bookingId]) {
    return res.status(404).json({ success: false, error: "Booking not found" });
  }

  delete bookings[bookingId];

  res.json({ success: true });
});

app.post("/release-availability", (req, res) => {
  const { hotelId, dates } = req.body;

  if (!hotels[hotelId]) {
    return res.status(404).json({ success: false, error: "Hotel not found" });
  }

  // In a real system, we would release the hold on these dates
  console.log(`Releasing availability for hotel ${hotelId} on dates ${dates}`);

  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Hotel service running on port ${PORT}`);
});
