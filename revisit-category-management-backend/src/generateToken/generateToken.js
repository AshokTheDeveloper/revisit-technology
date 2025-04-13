const jwt = require("jsonwebtoken");

const generateToken = async (user, res) => {
  const payload = {
    userId: user._id,
  };

  const SECRET = process.env.SECRET;
  const jwtToken = jwt.sign(payload, SECRET);
  return res.status(200).json({ jwtToken, message: "Login successful" });
};

module.exports = generateToken;
