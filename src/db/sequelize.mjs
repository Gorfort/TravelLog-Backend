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

// READ
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

// UPDATE
export const updateDB = async (
  id,
  country,
  city,
  title,
  reason,
  description
) => {
  const [updatedRows] = await Travel.update(
    { country, city, title, reason, description },
    {
      where: {
        id,
      },
    }
  );

  // If updatedRows is greater than 0, it means at least one row was updated (success)
  return updatedRows > 0;
};

// DELETE
export const deleteDB = async (id) => {
  const result = await Travel.destroy({
    where: {
      id,
    },
  });

  // If result is greater than 0, it means at least one row was deleted (success)
  return result > 0;
};
