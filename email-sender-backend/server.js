const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const nodemailer = require("nodemailer");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "Kingawesome@495",
  database: "email_system",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL!");
  }
});

app.post("/submit", async (req, res) => {
  const { name, email, recaptcha } = req.body;

  if (!name || !email || !recaptcha) {
    return res
      .status(400)
      .json({ message: "All fields and reCAPTCHA are required." });
  }

  try {
    // Verify reCAPTCHA
    const secretKey = "6LeoAW8rAAAAABj9njDfjNPopZNmVDbAjU5H5ELz";
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptcha}`;
    const response = await axios.post(verifyUrl);

    if (!response.data.success) {
      return res
        .status(400)
        .json({ message: "Failed reCAPTCHA verification." });
    }

    // Insert into DB
    const query = "INSERT INTO users (name, email) VALUES (?, ?)";
    db.query(query, [name, email], (err) => {
      if (err) {
        console.error("Error saving to DB:", err);
        return res.status(500).json({ message: "Error saving to database." });
      }

      // Send confirmation email
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "aneeshkrishnaparthasarathy@gmail.com",
          pass: "dddp jlim csgz qweo",
        },
      });

      const mailOptions = {
        from: "aneeshkrishnaparthasarathy@gmail.com",
        to: email,
        subject: "Confirmation Email",
        text: `Hi ${name},\n\nThanks for registering! We have received your email: ${email}.\n\nRegards,\nYour Team`,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error("Email sending error:", err);
          return res
            .status(500)
            .json({ message: "Failed to send confirmation email." });
        }

        console.log("Email sent:", info.response);
        res.status(200).json({ message: "User added and email sent." });
      });
    });
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    res
      .status(500)
      .json({ message: "Server error during reCAPTCHA verification." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
