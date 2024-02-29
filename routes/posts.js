const router = require("express").Router();
const UserModel = require("../models/User");
const PostModel = require("../models/Post");
const bcrypt = require("bcrypt");

// Create Post
router.post("/", async (req, res)=>{
   const newPost = new PostModel(req.body);
   try{
    const savePost =  await newPost.save();
    res.status(200).json(savePost);
   }
   catch(err){
    res.status(500).json(err);
   }
});

// Update Post
router.put("/:id", async (req, res) => {
    try {
      const post = await PostModel.findById(req.params.id);
      if (post.username === req.body.username) {
        try {
          const updatedPost = await PostModel.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedPost);
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can't update this post!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });


//Delete Post
router.delete("/:id", async (req, res) => {
    try {
      const post = await PostModel.findById(req.params.id);
      if (post.username === req.body.username) {
        try {
          await PostModel.findByIdAndDelete(req.params.id);
          res.status(200).json("Post has been deleted succcessful...");
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can't delete this post!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //Get Post
router.get("/:id", async (req, res) => {
    try {
      const post = await PostModel.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //Get All Posts
  router.get("/", async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
      let posts;
      if (username) {
        posts = await PostModel.find({ username });
      } else if (catName) {
        posts = await PostModel.find({
          categories: {
            $in: [catName],
          },
        });
      } else {
        posts = await PostModel.find(); //if there is no condition find all
      }
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
module.exports = router;
