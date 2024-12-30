import { Sequelize } from "sequelize";
export const sequelize = new Sequelize(
  process.env.DB_NAME || "admin_panel",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    logging: false,
  }
);
