const mongoose = require("mongoose");

const initializeDBAndServer = async (app) => {
  try {
    const MONGO_URI = process.env.MONGO_URI;
    await mongoose.connect(MONGO_URI);
    console.log("Database connected successfully");

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server started and listens on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Database connection failed:", error);
  }
};

module.exports = initializeDBAndServer;
