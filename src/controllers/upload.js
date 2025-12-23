const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    return res.status(200).json({
      message: "File uploaded successfully",
      filePath: req.file.key,
      fileUrl: req.file.location,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
};

module.exports = { uploadFile };
