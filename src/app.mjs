import express from "express";
import travelRouter from "./routes/travel.mjs";

const app = express();
const port = 3000;

// Define your first route
app.get("/", (req, res) => {
  res.send("Hello, this is your first route!");
});

// Use the travel router
app.use("/api", travelRouter); // Assuming your routes are prefixed with /api

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
