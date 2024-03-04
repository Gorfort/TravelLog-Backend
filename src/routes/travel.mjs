import express from "express";

import { Travel } from "../db/sequelize.mjs";
import { travels, deleteTravel } from "../db/mock.mjs";

const router = express.Router();

router.get("/travels", (req, res) => {
  console.log("GET /travels endpoint hit");
  res.json(travels);
});

// Get a specific travel entry by ID
router.get("/travels/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const travel = await Travel.findByPk(id);

    console.log(travel);

    if (!travel) {
      res.status(404).json({ error: "Travel entry not found" });
    } else {
      res.json(travel);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
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
  try {
    const { id } = req.params;
    const travelsIds = travels.map((t) => t.id);

    if (!travelsIds.includes(parseInt(id))) {
      return res.status(400).json({ message: "Id not found." });
    }

    // Assuming you have a function named deleteTravel to delete the entry
    deleteTravel(id);

    // Return a success message after deletion
    const message = `Travel entry with ID ${id} deleted successfully`;
    res.json({ message });
  } catch (error) {
    const message =
      "The travel entry could not be deleted. Please try again later.";
    res.status(500).json({ message, data: error });
  }
});

export default router;
