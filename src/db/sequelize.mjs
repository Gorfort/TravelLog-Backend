import { Sequelize, DataTypes, where } from "sequelize";
import { TravelModel } from "../Model/TravelModel.mjs";
import { travels } from "./mock.mjs";

export const sequelize = new Sequelize(
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

export const readDB = async (travelID) => {
  return await Travel.findAll({
    where: {
      id: travelID,
    },
  });
};

export const createDB = async (country, city, title, reason, description) => {
  return await Travel.create({ country, city, title, reason, description });
};

export const updateDB = async (
  id,
  country,
  city,
  title,
  reason,
  description
) => {
  await Travel.update(
    { country, city, title, reason, description },
    {
      where: {
        id,
      },
    }
  );
};

export const deleteDB = async (id) => {
  await Travel.destroy({
    where: {
      id,
    },
  });
};
