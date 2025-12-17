const express = require('express');
const authRoutes = require('../routes/auth');
const employeeRoutes = require('../routes/employees');

function createServer() {
  const app = express();
  app.use(express.json());
  app.use('/api/auth', authRoutes);
  app.use('/api/employees', employeeRoutes);

  app.get('/', (req, res) => {
    res.send('HRMS backend running');
  });

  return app;
}

module.exports = createServer;
