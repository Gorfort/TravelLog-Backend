import { Sequelize, DataTypes } from "sequelize";
import { TravelModel } from "../Model/TravelModel.mjs";
import { travels } from "./mock.mjs";

const sequelize = new Sequelize(
  "db_travels", // Database name
  "root", // Database user
  "root", // Database password
  {
    host: "localhost",
    port: "6033",
    dialect: "mysql",
    logging: false,
  }
);

// Define the travel model
const Travel = TravelModel(sequelize, DataTypes);

// Initialize the database
let initDb = async () => {
  try {
    await sequelize.sync({ force: true });
    await importTravels();
    console.log("The database db_travels has been synchronized successfully");
  } catch (error) {
    console.error("Error synchronizing the database:", error);
  }
};

const importTravels = async () => {
  try {
    for (const travel of travels) {
      const createdTravel = await Travel.create({
        country: travel.country,
        city: travel.city,
        title: travel.title,
        reason: travel.reason,
        description: travel.description,
      });
      console.log(createdTravel.toJSON());
    }

    console.log("Travels imported successfully");
  } catch (error) {
    console.error("Error importing travels:", error);
  }
};

export { sequelize, initDb, Travel };
