const express = require('express');

function createServer() {
  const app = express();
  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('HRMS backend running');
  });

  return app;
}

module.exports = createServer;
