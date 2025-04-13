const app = require("./src/app");
const initializeDBAndServe = require("./src/config/initializeDBAndServer");

initializeDBAndServe(app);
