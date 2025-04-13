const Category = require("../models/category");

const addCategory = async (req, res) => {
  try {
    const { name, itemCount, image } = req.body;
    if (!name || !itemCount || !image) {
      return res.status(400).json({ message: "Required all the fields" });
    }
    const dbCategory = await Category.findOne({ name });
    if (dbCategory) {
      return res.status(409).json({ message: "Category already found" });
    }
    const category = await Category.create(req.body);
    return res
      .status(201)
      .json({ message: "Category created successfully", category });
  } catch (error) {
    console.log("Internal server error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = addCategory;
