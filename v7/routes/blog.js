const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");
const middleware = require("../middleware");

// Get all the blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find({});
    // res.json(blogs);
    res.render("blogs/index",{blogs});
  } catch (err) {
    const message = err.message || "Error retrieving galleries";
    res.status(500)
    req.flash(
      "error", message +
      "There was an error retrieving the blogs. Please try again later."
    );
  }
});



// Create a new blog
// router.post(
//   "/",
//   middleware.isLoggedIn,
//   middleware.isAdmin,
//   async (req, res) => {
//     try {
//       const newBlog = new Blog(req.body);
//       const blog = await newBlog.save();
//       res.json(blog);
//     } catch (err) {
//       res.send(err);
//     }
//   }
// );
router.post(
  "/",
  middleware.isLoggedIn,
  async (req, res) => {
    try {
      console.log(req.user.username);
      const newBlog = new Blog(req.body);
      const blog = await newBlog.save();
      req.flash("success", "Blog successfully created");
      res.redirect(`/blogs/${blog._id}`);
    } catch (err) {
      console.error(err);
      req.flash("error", "Failed to create blog");
      res.redirect("/blogs/new");
    }
  }
);

//render the form to add blog
router.get("/new", middleware.isLoggedIn,  (req, res) => {
  try {
    res.render("blogs/form");
  } catch (err) {
    const message = err.message || "Error rendering new blog form";
    res.status(500).json({ message });
  }
});

// Get a specific blog by ID
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      req.flash("error", "Blog not found");
      return res.redirect("/blogs");
    }
    res.render("blogs/show", { blog });
  } catch (err) {
    req.flash("error", "Error retrieving blog");
    res.redirect("/blogs");
  }
});


// Update a blog by ID
router.put(
  "/:id/edit",
  middleware.isLoggedIn,
  middleware.isAdmin,
  async (req, res) => {
    try {
      const blog = await Blog.findByIdAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      res.json(blog);
    } catch (err) {
      res.send(err);
    }
  }
);

// Delete a blog by ID
router.delete(
  "/:id",
  middleware.isLoggedIn,
  middleware.isAdmin,
  async (req, res) => {
    try {
      const blog = await Blog.deleteOne({ _id: req.params.id });
      res.json({ message: "Blog deleted successfully" });
    } catch (err) {
      res.send(err);
    }
  }
);

module.exports = router;
