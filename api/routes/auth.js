const router = require("express").Router();
const UserModel = require("../models/User");
const bcrypt = require("bcrypt");


//Register
router.post("/register", async (req, res)=>{
    try{

        const salt = await bcrypt.genSalt(10);
        const passHashed = await bcrypt.hash(req.body.password, salt);
        const newUser = new UserModel({
            username: req.body.username,
            email: req.body.email,
            password: passHashed,
        })

        const user = await newUser.save();
        res.status(200).json(user);
    }
    catch(err){
        res.status(500).json(err);
    };
});

//Login
router.post("/login", async (req, res)=>{
    try{
        const user = await UserModel.findOne({username: req.body.username});
        !user && res.status(400).json("Wrong Credentials!");

        const validated = await bcrypt.compare(req.body.password, user.password);
        !validated && res.status.json("Wrong Credentials!");

        const {password, ...others} = user._doc;
        res.status(200).json(others);
    }
    catch(err){
        res.status(500).json(err);
    };
});


module.exports = router;
