const bcrypt = require("bcrypt");
const User = require("../models/user");
const generateToken = require("../generateToken/generateToken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const dbUser = await User.findOne({ email });

    if (!dbUser) {
      return res.status(409).json({ message: "Invalid user" });
    }
    const isPasswordMatch = await bcrypt.compare(password, dbUser.password);

    if (!isPasswordMatch)
      return res.status(401).json({ message: "Invalid password or email" });

    return generateToken(dbUser, res);
  } catch (error) {
    console.log("Internal serve error");
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = login;
