require('dotenv').config();
const createServer = require('./config/server');

// making, connection to the data-base
// const { connectDB, sequelize } = require("./db/db");
const { connectDB, sequelize } = require("./db/db");
const User = require("./models/usermodel");

async function main() {
  await connectDB();

  // Creates tables if not exist:
  await sequelize.sync({ alter: true }); // use { force: true } ONLY for dev resets
  console.log("✅ Models synced");

  // Example: create a user
  const created = await User.create({
    name: "Ada Lovelace",
    email: "ada@example.com",
    passwordHash: "some_hashed_password_here",
  });

  console.log("Created user:", created.toJSON());

  // Example: fetch users
  const users = await User.findAll();
  console.log("All users:", users.map((u) => u.toJSON()));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});


const app = createServer();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

