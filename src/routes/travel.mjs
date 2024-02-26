import express from "express";
import { travels } from "../db/mock.mjs";

const router = express.Router();

router.get("/travels", (req, res) => {
  console.log("GET /travels endpoint hit");
  res.json(travels);
});

// Get a specific travel entry by ID
router.get("/travels/:id", (req, res) => {
  const { id } = req.params;
  const travel = travels.find((entry) => entry.id === parseInt(id));

  if (!travel) {
    res.status(404).json({ error: "Travel entry not found" });
  } else {
    res.json(travel);
  }
});

// Create a new travel entry
router.post("/travels", (req, res) => {
  const newTravel = req.body;
  newTravel.id = travels.length + 1;
  travels.push(newTravel);
  res.status(201).json(newTravel);
});

// Update a travel entry by ID
router.put("/travels/:id", (req, res) => {
  const { id } = req.params;
  const updatedTravel = req.body;
  const index = travels.findIndex((entry) => entry.id === parseInt(id));

  if (index === -1) {
    res.status(404).json({ error: "Travel entry not found" });
  } else {
    travels[index] = { ...travels[index], ...updatedTravel };
    res.json(travels[index]);
  }
});

// Delete a travel entry by ID
router.delete("/travels/:id", (req, res) => {
  const { id } = req.params;
  travels = travels.filter((entry) => entry.id !== parseInt(id));
  res.json({ message: "Travel entry deleted successfully" });
});

export default router;
