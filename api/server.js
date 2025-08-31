const express = require("express");
const pool = require("./db");   // db.js import
const app = express();

app.use(express.json());

// Test route for DB
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ message: "Backend + Database connected 🚀", time: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
