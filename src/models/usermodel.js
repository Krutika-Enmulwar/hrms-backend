// const pool = require('../config/db');

// const createUser = async ({ name, email, password, role }) => {
//   const result = await pool.query(
//     `INSERT INTO users (name, email, password, role)
//      VALUES ($1, $2, $3, $4)
//      RETURNING id, name, email, role, created_at`,
//     [name, email, password, role]
//   );

//   return result.rows[0];
// };

// module.exports = {
//   createUser,
// };

const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db");


const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(120),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    email: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    passwordHash: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "users",
    timestamps: true, // adds createdAt + updatedAt
    underscored: true, // created_at instead of createdAt
    indexes: [{ unique: true, fields: ["email"] }],
  }
);

module.exports = User;
