const express = require('express');
const { getEmployees, updateProfileImage, } = require('../controllers/employee');
const router = express.Router();

router.get('/', getEmployees);
router.put('/profile-image', updateProfileImage);

module.exports = router;
