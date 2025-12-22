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

//cloud storage placeholder for now
const updateProfileImage = async (req, res) => {
  try {
    const { userId, imageUrl } = req.body;

    if (!userId || !imageUrl) {
      return res.status(400).json({
        message: "userId and imageUrl are required",
      });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.profileImageUrl = imageUrl;
    await user.save();

    res.json({
      message: "Profile image path saved successfully",
      profileImageUrl: user.profileImageUrl,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update profile image" });
  }
};

module.exports = {
  getEmployees,
  updateProfileImage,
};

