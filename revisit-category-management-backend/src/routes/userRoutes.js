const express = require("express");
const router = express.Router();

const signup = require("../controllers/signup");
const login = require("../controllers/login");
const getCategories = require("../controllers/getCategories");
const addCategory = require("../controllers/addCategory");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/signup", signup);
router.post("/login", login);
router.get("/", authMiddleware, getCategories);
router.post("/", authMiddleware, addCategory);

module.exports = router;
