const express = require('express');
const authRoutes = require('../routes/auth');
const employeeRoutes = require('../routes/employees');
const uploadRoutes = require('../routes/upload');

function createServer() {
  const app = express();
   app.use(express.json());
   app.use('/api/auth', authRoutes);
   app.use('/api/employees', employeeRoutes);
    app.use('/api', uploadRoutes);

  return app;
}

module.exports = createServer;
