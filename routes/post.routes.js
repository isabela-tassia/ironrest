const router = require("express").Router();
const PostModel = require("../models/Post.model");
const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser");
const UserModel = require("../models/User.model");
// Crud - Create Post
// Create post
router.post(
  "/create-post",
  isAuthenticated,
  attachCurrentUser,
  async (req, res) => {
    console.log(req.body);
    try {
      console.log(req.body);

      const createPost = await PostModel.create({
        ...req.body,
        user: req.currentUser._id,
      });
      await UserModel.findOneAndUpdate(
        { _id: req.currentUser._id },
        { $push: { user: createPost._id } }
      );
      return res.status(201).json(createPost);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: JSON.stringify(err) });
    }
  }
);

// Read the Post
router.get("/post", async (req, res) => {
  try {
    const readPost = await PostModel.find();

    console.log(readPost);

    if (readPost) {
      return res.status(200).json(readPost);
    } else {
      return res.status(404).json({ msg: "Post not found." });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: JSON.stringify(err) });
  }
});
// Delete the Post
router.delete("/post/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletePost = await PostModel.deleteOne({ _id: id });

    // If the search has not found results, return 404
    if (deletePost.n === 0) {
      return res.status(404).json({ msg: "Post not found." });
    }

    // By convention, in exclusions we return an empty object to describe the success
    return res.status(200).json({});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: JSON.stringify(err) });
  }
});

module.exports = router;
