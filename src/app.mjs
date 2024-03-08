import express from "express";
import travelRouter from "./routes/travel.mjs";

const app = express();
const port = 3000;

import { sequelize } from "./db/sequelize.mjs";
sequelize
  .authenticate()
  .then((_) =>
    console.log("La connexion à la base de données a bien été établie")
  )
  .catch((error) =>
    console.error("Impossible de se connecter à la DB" + error.stack)
  );

//initDb();

app.use(express.json());

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
