const express = require("express");
const session = require("express-session");
const authRouter = require("./routes/auth");
const logementsRouter = require("./routes/logements");
const bailleursRouter = require("./routes/bailleurs");
const bailleurlogementRouter = require("./routes/bailleurlogement");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const Logement = require("./models/logement");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());

// Use CORS middleware
app.use(cors());

// Serve static images
app.use(express.static(path.join(__dirname, "public/images")));

// Session management middleware
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Use secure: true in production with HTTPS
  })
);

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/school?authSource=admin")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));



  
// Use authentication router
app.use("/api/auth", authRouter);

// Use bailleurlogement router
app.use("/api/bailleurlogement", bailleurlogementRouter);
// Use bailleurs router
app.use("/api/bailleurs", bailleursRouter);

// Use logements router
app.use("/api/logements", logementsRouter);

// Route to get logements for a specific bailleur
app.get("/api/logements/bailleur/:bailleurId", async (req, res) => {
  try {
    const logements = await Logement.find({
      bailleurId: req.params.bailleurId,
    });
    res.json(logements);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "An error occurred" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
