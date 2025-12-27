const express = require("express");
const router = express.Router();

const {
  getEmployees,
  assignManager,
  getManager,
  getDirectReports,
  getSubtree,
} = require("../controllers/employee");

router.get("/", getEmployees);
router.put("/:id/manager", assignManager);
router.get("/:id/manager", getManager);
router.get("/:id/reports", getDirectReports);
router.get("/:id/subtree", getSubtree); 

module.exports = router;
