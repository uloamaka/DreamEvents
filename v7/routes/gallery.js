const router = require("express").Router();
const Gallery = require("../models/gallery");
const middleware = require("../middleware");

//GET all galleries
router.get("/", async (req, res) => {
  try {
    const galleries = await Gallery.find();
    res.render("gallery/gallery", { galleries });
  } catch (err) {
    const message = err.message || "Error retrieving galleries";
    res.status(500).json({ message });
  }
});

// Render the form to add images to gallery
router.get("/new", middleware.isLoggedIn, async (req, res) => {
  try {
    res.render("gallery/form");
  } catch (err) {
    const message = err.message || "Error rendering new galliery form";
    res.status(500).send({ message });
  }
});

// GET a single gallery by id
router.get("/:id", getGallery, (req, res) => {
  res.render("gallery/gallery-details", { gallery: res.gallery });
});

// CREATE a new gallery
router.post("/", middleware.isLoggedIn, async (req, res) => {
  const gallery = new Gallery({
    image: req.body.image,
  });

  try {
    const newGallery = await gallery.save();
    res.status(201).redirect("/gallery");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE a gallery by id
router.put("/:id", getGallery, async (req, res) => {
  if (req.body.images != null) {
    res.gallery.images = req.body.images;
  }
  try {
    const updatedGallery = await Gallery.findByIdAndUpdate(req.params.id, {
      image: req.body.image,
    });
    res.json(updatedGallery);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a gallery by id
router.delete("/:id", getGallery, async (req, res) => {
  try {
    await res.gallery.deleteOne();
    res.json({ message: "Gallery deleted" });
  } catch {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get a gallery by id
async function getGallery(req, res, next) {
  let gallery;
  try {
    gallery = await Gallery.findById(req.params.id);
    if (gallery == null) {
      return res.status(404).json({ message: "Gallery not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.gallery = gallery;
  next();
}

module.exports = router;
