const router = require("express").Router();
const UserModel = require("../models/User");
const PostModel = require("../models/Post");
const bcrypt = require("bcrypt");

// Update User
router.put("/:id", async (req, res)=>{
    if(req.body.userId === req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        };
        try{
            await PostModel.deleteMany({username: req.body.username});
            const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, {
                 $set: req.body,
            },{new:true});
            res.status(200).json(updatedUser);
        }

        catch(err){
            res.status(500).json(err)
        }
    } else{
        res.status(401).json("You can't update this acccount");
    };
});

//Delete User
router.delete("/:id", async (req, res) => {
    if (req.body.userId == req.params.id) {
      try {
        const user = await UserModel.findById(req.params.id);
        try {
          await PostModel.deleteMany({ username: user.username });
          await UserModel.findByIdAndDelete(req.params.id);
          res.status(200).json("User has been deleted successfully...");
        } catch (err) {
          res.status(500).json(err);
        }
      } catch (err) {
        res.status(404).json("User not found!");
      }
    } else {
      res.status(401).json("You can't delete this account!");
    }
  });

  //Get User
  router.get("/:id", async (req, res)=>{
    try {
      const user = await UserModel.findById(req.params.id);
      const {password, ...others} = user._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err)
    }
  });

module.exports = router;
