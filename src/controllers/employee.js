const User = require("../models/usermodel");

const getEmployees = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "profileImageUrl"],
    });

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch employees" });
  }
};

const assignManager = async (req, res) => {
  try {
    const { id } = req.params;
    const { reportingId } = req.body;

    if (!reportingId) {
      return res.status(400).json({ message: "reportingId is required" });
    }

    if (id === reportingId) {
      return res.status(400).json({ message: "Employee cannot report to self" });
    }

    const employee = await User.findByPk(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const manager = await User.findByPk(reportingId);
    if (!manager) {
      return res.status(404).json({ message: "Manager not found" });
    }

    employee.reportingId = reportingId;
    await employee.save();

    res.json({
      message: "Manager assigned successfully",
      employeeId: employee.id,
      managerId: manager.id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to assign manager" });
  }
};

const getManager = async (req, res) => {
  try {
    const employee = await User.findByPk(req.params.id);

    if (!employee || !employee.reportingId) {
      return res.status(404).json({ message: "Manager not found" });
    }

    const manager = await User.findByPk(employee.reportingId);

    res.json(manager);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch manager" });
  }
};

const getDirectReports = async (req, res) => {
  try {
    const reports = await User.findAll({
      where: { reportingId: req.params.id },
    });

    res.json(reports);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch reports" });
  }
};

const getSubtree = async (req, res) => {
  try {
    const buildTree = async (managerId) => {
      const reports = await User.findAll({
        where: { reportingId: managerId },
      });

      const result = [];
      for (const emp of reports) {
        result.push({
          ...emp.toJSON(),
          reports: await buildTree(emp.id),
        });
      }
      return result;
    };

    const tree = await buildTree(req.params.id);
    res.json(tree);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch hierarchy" });
  }
};

module.exports = {
  getEmployees,
  assignManager,
  getManager,
  getDirectReports,
  getSubtree,
};