const User = require("../models/user");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  try {
    const { fullname, username, email, password } = req.body;

    const dbUser = await User.findOne({ email });
    if (dbUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      fullname,
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({ message: "signup successfully" });
  } catch (error) {
    console.log("Internal server error");
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = signup;
