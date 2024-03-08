import express from "express";
import { createDB, readDB, updateDB, deleteDB } from "../db/sequelize.mjs";

const router = express.Router();

router.get("/travels", (req, res) => {
  console.log("GET /travels endpoint hit");
  res.json(travels);
});

// Get a specific travel entry by ID
router.get("/travels/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // const travel = await Travel.findByPk(id);
    const travel = await readDB(id);

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
router.post("/travels", async (req, res) => {
  try {
    const newTravel = req.body;
    const createDBresult = await createDB(
      req.body.country,
      req.body.city,
      req.body.title,
      req.body.reason,
      req.body.description
    );

    res.json(createDBresult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a travel entry by ID
router.put("/travels/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updateResult = await updateDB(
      id,
      req.body.country,
      req.body.city,
      req.body.title,
      req.body.reason,
      req.body.description
    );

    if (!updateResult) {
      // If updateDB returns false, it means no entry was updated (ID not found)
      res.status(404).json({ error: "Travel entry not found" });
    } else {
      res.status(200).json({ message: "Travel Entry Successfully Edited" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a travel entry by ID
router.delete("/travels/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletionResult = await deleteDB(id);

    if (!deletionResult) {
      // If deleteDB returns false, it means no entry was deleted (ID not found)
      res.status(404).json({ error: "Travel entry not found" });
    } else {
      res.status(200).json({ message: "Travel Entry Successfully deleted" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
