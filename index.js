import express from "express";
import cors from "cors";
import "./loadEnvironment.js";
import "express-async-errors";
import leaderboard from "./routes/leaderboard.js";
//const mongoose = require("mongoose");
//const userModel = require("./models");

const PORT = process.env.PORT || 5050;
const app = express();

// Cors middleware - bypasses API call restrictions from frontend to backend
app.use(cors());
// Express server middleware - allows user to send any JSON using a client
app.use(express.json());

// Load the /leaderboard routes. API Calls -> Defined in routes/leaderboard.js
app.use("/leaderboard", leaderboard);

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.")
})

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

// CONNECT TO MONGODB -> Handled in db/conn.js
