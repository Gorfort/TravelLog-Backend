import express from "express";

import { TravelModel } from "../Model/TravelModel.mjs";
import { travels, deleteTravel } from "../db/mock.mjs";

const router = express.Router();

router.get("/travels", (req, res) => {
  console.log("GET /travels endpoint hit");
  res.json(travels);
});

// Get a specific travel entry by ID
router.get("/travels/:id", (req, res) => {
  const { id } = req.params;

  // Appel aux données définies dans le tableau de MOCK
  //const travel = travels.find((entry) => entry.id === parseInt(id));

  const travel = TravelModel.findByPk(req.params.id);
  console.log(travel);

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
  try {
    const { id } = req.params;

    const travelsIds = travels.map((t) => t.id);
    if (!travelsIds.includes(parseInt(id))) {
      return res.status(400).json({ message: "Id not found." });
    }

    deleteTravel(id);
    res.json({ message: "Travel entry deleted successfully" });
  } catch (error) {
    const message =
      "Le produit n'a pas pu être supprimé. Merci de réessayer dans quelques instants.";
    res.status(500).json({ message, data: error });
  }
});

export default router;
