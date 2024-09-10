const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

const PORT = 3000;

app.post("/api/book", async (req, res) => {
  try {
    const response = await axios.post("http://localhost:3001/book", req.body);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Frontend server running on port ${PORT}`);
});
