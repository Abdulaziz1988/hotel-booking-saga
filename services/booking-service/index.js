const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const PORT = 3001;

app.post("/book", async (req, res) => {
  const { userId, hotelId, dates } = req.body;

  let hotelAvailabilityResponse;
  let paymentResponse;
  let confirmationResponse;

  try {
    // Step 1: Check hotel availability
    hotelAvailabilityResponse = await axios.post(
      "http://localhost:3003/check-availability",
      { hotelId, dates }
    );

    if (!hotelAvailabilityResponse.data.available) {
      throw new Error("Hotel not available for the selected dates");
    }

    // Step 2: Process payment
    paymentResponse = await axios.post(
      "http://localhost:3002/process-payment",
      { userId, amount: hotelAvailabilityResponse.data.price }
    );

    if (!paymentResponse.data.success) {
      throw new Error("Payment failed");
    }

    // Step 3: Confirm hotel booking
    confirmationResponse = await axios.post(
      "http://localhost:3003/confirm-booking",
      { hotelId, dates, userId }
    );

    res.json({ success: true, bookingId: confirmationResponse.data.bookingId });
  } catch (error) {
    console.error("Booking failed:", error.message);

    // Implement compensating transactions
    if (paymentResponse && paymentResponse.data.success) {
      try {
        await axios.post("http://localhost:3002/refund-payment", {
          transactionId: paymentResponse.data.transactionId,
        });
        console.log("Payment refunded");
      } catch (refundError) {
        console.error("Refund failed:", refundError.message);
      }
    }

    if (hotelAvailabilityResponse && hotelAvailabilityResponse.data.available) {
      try {
        await axios.post("http://localhost:3003/release-availability", {
          hotelId,
          dates,
        });
        console.log("Hotel availability released");
      } catch (releaseError) {
        console.error(
          "Releasing hotel availability failed:",
          releaseError.message
        );
      }
    }

    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Booking service running on port ${PORT}`);
});
