const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const PORT = 3002;

const transactions = {};

app.post("/process-payment", (req, res) => {
  const { userId, amount } = req.body;

  // Simulate payment processing
  const success = Math.random() < 0.8; // 80% success rate

  if (success) {
    const transactionId = Date.now();
    transactions[transactionId] = { userId, amount, status: "completed" };
    res.json({ success: true, transactionId });
  } else {
    res.status(400).json({ success: false, error: "Payment failed" });
  }
});

app.post("/refund-payment", (req, res) => {
  const { transactionId } = req.body;

  if (!transactions[transactionId]) {
    return res
      .status(404)
      .json({ success: false, error: "Transaction not found" });
  }

  if (transactions[transactionId].status === "refunded") {
    return res
      .status(400)
      .json({ success: false, error: "Transaction already refunded" });
  }

  // Simulate refund processing
  const success = Math.random() < 0.9; // 90% success rate

  if (success) {
    transactions[transactionId].status = "refunded";
    res.json({ success: true, refundId: Date.now() });
  } else {
    res.status(400).json({ success: false, error: "Refund failed" });
  }
});

app.get("/transaction/:id", (req, res) => {
  const transactionId = req.params.id;

  if (!transactions[transactionId]) {
    return res
      .status(404)
      .json({ success: false, error: "Transaction not found" });
  }

  res.json({ success: true, transaction: transactions[transactionId] });
});

app.listen(PORT, () => {
  console.log(`Payment service running on port ${PORT}`);
});
