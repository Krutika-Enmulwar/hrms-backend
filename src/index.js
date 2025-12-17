const createServer = require('./config/server');

const app = createServer();

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

