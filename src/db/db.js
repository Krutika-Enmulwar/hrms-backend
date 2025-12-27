const { Sequelize } = require("sequelize");

// Option A: Use a DATABASE_URL (recommended in production)
// Example: postgres://postgres:postgres@localhost:5432/mydb

// const DATABASE_URL = process.env.DATABASE_URL;
const DATABASE_URL = process.env.DATABASE_URL;

const sequelize = DATABASE_URL
  ? new Sequelize(DATABASE_URL, {
      dialect: "postgres",
      logging: false, // set true to see SQL logs
    })
  : new Sequelize(
      process.env.PG_DATABASE || "hrms_db",
      process.env.PG_USER || "vaishnav",
      process.env.PG_PASSWORD || "vaishnav",
      {
        host: process.env.PG_HOST || "localhost",
        port: Number(process.env.PG_PORT || 5432),
        dialect: "postgres",
        logging: false,
      }
    );

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("Connected to PostgreSQL via Sequelize");
  } catch (err) {
    console.error("Unable to connect to DB:", err);
    process.exit(1);
  }
}

module.exports = { sequelize, connectDB };
