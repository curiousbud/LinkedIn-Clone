const express = require("express");
const userRoutes = require("./user");
const postRoutes = require("./post");

const router = express.Router();

// Import other route files

// Use the route files
router.use("/users", userRoutes);
router.use("/posts", postRoutes);

// Default route
router.get("/", (req, res) => {
  res.send("Welcome to the LinkedIn Clone API");
});

module.exports = router;
