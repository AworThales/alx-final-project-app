const router = require("express").Router();
const CategoryModel = require("../models/Category");

// Create Category
router.post("/", async (req, res)=>{
    const newCat = new CategoryModel(req.body);
   try {
    const saveCat = await newCat.save();
    res.status(200).json(saveCat);
   } catch (err) {
    res.status(500).json(err);
   } 
});

// Get All Category
router.get("/", async (req, res)=>{
   try {
    const Cats = await CategoryModel.find();
    res.status(200).json(Cats);
   } catch (err) {
    res.status(500).json(err);
   } 
});


module.exports = router;
