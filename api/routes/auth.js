const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db"); // <-- apna db connection yahan se import karo

const router = express.Router();

// ✅ LOGIN API
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. User check karo
    const result = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    if (result.rows.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = result.rows[0];

    // 2. Password check karo
    const valid = bcrypt.compareSync(password, user.password_hash);
    if (!valid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // 3. Token banao
    const token = jwt.sign(
      { id: user.id, email: user.email },
      "secretkey", // future me .env me rakhenge
      { expiresIn: "1h" }
    );

    res.json({ access_token: token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
