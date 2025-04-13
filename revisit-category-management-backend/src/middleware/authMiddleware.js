const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    let jwtToken = "";

    const authHeader = req.headers?.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Invalid access token" });
    }

    jwtToken = authHeader.split(" ")[1];
    if (!jwtToken) {
      return res.status(401).json({ message: "Invalid access token" });
    }

    const SECRET = process.env.SECRET;
    jwt.verify(jwtToken, SECRET, (error, payload) => {
      if (error) {
        return res.status(401).json({ message: "User not authenticated" });
      }
      req.user = payload;
      next();
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = authMiddleware;
