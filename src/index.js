require('dotenv').config();
const createServer = require('./config/server');
const { connectDB } = require('./db/db');

async function start() {
  try {
    // Connect to database
    await connectDB();
    console.log('✅ Database connected');

    // Create express app
    const app = createServer();
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
}

start();


