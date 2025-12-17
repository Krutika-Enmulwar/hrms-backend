require('dotenv').config();
const createServer = require('./config/server');

const app = createServer();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

