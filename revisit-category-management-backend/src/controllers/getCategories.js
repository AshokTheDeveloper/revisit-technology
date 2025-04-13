const Category = require("../models/category");

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories) {
      return res.status(404).json({ message: "categories not found" });
    }
    res.status(200).json({ categories });
  } catch (error) {
    console.log("Internal server error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = getCategories;
