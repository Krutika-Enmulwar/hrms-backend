const pool = require('../config/db');

const getEmployees = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, role FROM users'
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch employees' });
  }
};

module.exports = { getEmployees };
