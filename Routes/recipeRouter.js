const express = require("express");
const {recipeFunctions} = require("../Controllers/recipeFunctions")
const router = express.router();

router.route("/").get(recipeFunctions);


router.route("/").get((req,res) => {
    res.status(200).json({message: "Show all recipes"})
});

router.route("/:title").get((req,res) => {
    res.status(200).json({message: "Retrieve a specific recipe by title"})
});

router.route("/").post((req,res) => {
    res.status(200).json({message: "Create a new recipe"})
});

router.route("/:id").put((req,res) => {
    res.status(200).json({message: "Update a recipe"})
});

router.route("/:id").delete((req,res) => {
    res.status(200).json({message: "Delete a recipe"})
});



module.exports = router;