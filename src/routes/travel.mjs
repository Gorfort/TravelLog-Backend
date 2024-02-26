import express from "express";

const router = express.Router();

// Sample data (for demonstration purposes)
let travels = [
  {
    // http://localhost:3000/api/travels/1
    id: 1,
    country: "France",
    city: "Paris",
    title: "Exploring the City of Lights",
    reason: "Travel",
    description:
      "A wonderful trip to explore the cultural and historical wonders of Paris.",
  },

  // http://localhost:3000/api/travels/2
  {
    id: 2,
    country: "Italy",
    city: "Rome",
    title: "Roman Holiday",
    reason: "Travel",
    description: "An exciting adventure through the ancient streets of Rome.",
  },
];

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
