// mock.mjs
export let travels = [
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
  {
    id: 2,
    country: "Italy",
    city: "Rome",
    title: "Roman Holiday",
    reason: "Travel",
    description: "An exciting adventure through the ancient streets of Rome.",
  },
  {
    id: 3,
    country: "Japan",
    city: "Tokyo",
    title: "Tokyo Dreams",
    reason: "Travel",
    description: "Discovering the modern and traditional sides of Tokyo.",
  },
  {
    id: 4,
    country: "USA",
    city: "New York",
    title: "Big Apple Escape",
    reason: "Travel",
    description: "Exploring the vibrant energy of New York City.",
  },
  {
    id: 5,
    country: "Australia",
    city: "Sydney",
    title: "Down Under Adventure",
    reason: "Travel",
    description: "Experiencing the beauty and wildlife of Sydney.",
  },
  {
    id: 6,
    country: "Spain",
    city: "Barcelona",
    title: "Barcelona Bliss",
    reason: "Travel",
    description: "Savoring the rich culture and cuisine of Barcelona.",
  },
  {
    id: 7,
    country: "India",
    city: "Jaipur",
    title: "Royal Retreat",
    reason: "Travel",
    description: "Immersing in the royal heritage of Jaipur, India.",
  },
  {
    id: 8,
    country: "Canada",
    city: "Vancouver",
    title: "Pacific Northwest Paradise",
    reason: "Travel",
    description: "Exploring the stunning landscapes of Vancouver.",
  },
  {
    id: 9,
    country: "Brazil",
    city: "Rio de Janeiro",
    title: "Carnival Celebration",
    reason: "Travel",
    description: "Dancing and celebrating during Rio de Janeiro's Carnival.",
  },
  {
    id: 10,
    country: "Germany",
    city: "Berlin",
    title: "Berlin Beat",
    reason: "Travel",
    description: "Experiencing the eclectic arts and music scene in Berlin.",
  },
  {
    id: 11,
    country: "China",
    city: "Beijing",
    title: "Great Wall Expedition",
    reason: "Travel",
    description: "Hiking along the iconic Great Wall of China.",
  },
  {
    id: 12,
    country: "Greece",
    city: "Athens",
    title: "Ancient Athens Adventure",
    reason: "Travel",
    description: "Exploring the ancient ruins and history of Athens, Greece.",
  },
];

export const deleteTravel = (id) => {
  travels = travels.filter((f) => f.id !== parseInt(id));
};
