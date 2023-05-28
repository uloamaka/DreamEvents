const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");

router.get("/", async (req, res) => {
  const blogs = await Blog.find({});

  res.render("about/about", { blogs });
});

module.exports = router;
