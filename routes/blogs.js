const express = require("express");
const router = express.Router();
const Blog = require("../model/blog");
const multer = require("multer");

//Get Router
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.send(blogs);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//For getting a single item
router.get("/:id", getBlog, (req, res) => {
  res.send(res.blog);
});

//For Posting an item
router.post("/", async (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    desc: req.body.desc,
    photo: req.body.photo,
    // blogImg: req.file.originalname,
  });

  try {
    const newBlog = await blog.save();
    res.status(201).send(newBlog);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

//For Updating an item
router.patch("/:id", getBlog, async (req, res) => {
  if (req.body.title) res.blog.title = req.body.title;
  if (req.body.desc) res.blog.desc = req.body.desc;
  if (req.body.photo) res.blog.photo = req.body.photo;

  try {
    const updatedBlog = await res.blog.save();
    res.send(updatedBlog);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

//For deleting an item
router.delete("/:id", getBlog, async (req, res) => {
  try {
    await res.blog.remove();
    res.send({ message: "Deleted Student" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

async function getBlog(req, res, next) {
  let blog;
  try {
    blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).send({ message: "Cannot find blog" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }

  res.blog = blog;
  next();
}

module.exports = router;
