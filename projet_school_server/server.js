const express = require("express");
const session = require("express-session");
const connect = require('./models/DB_connection');
const router=require('./routes');
const jwt = require('jsonwebtoken');
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());
connect();

// Use CORS middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Serve static images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Session management middleware
app.use(session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Utilisation des api
app.use("/api", router);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ error: "An error occurred" });
});

const hostname = '127.0.0.1';

app.listen(PORT, hostname, () => {
    console.log(`Server is running on port http://${hostname}:${PORT}`);
});