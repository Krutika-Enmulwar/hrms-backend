const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('employee list');
});

module.exports = router;
