const express = require("express");
const router = express.Router();
const {
    showAllRecipe,
    getRecipeByTitle,
    createNewRecipe,
    updateRecipe,
    deleteRecipe
} = require("../Controllers/recipeFunctions")

// Route to get all recipes
router.route("/").get(showAllRecipe);

// Route to get a recipe by title
router.route("/:title").get(getRecipeByTitle);

// Route to create a new recipe
router.route("/").post(createNewRecipe);

// Route to update a recipe by ID
router.route("/:id").put(updateRecipe);

// Route to delete a recipe by ID
router.route("/:id").delete(deleteRecipe);

module.exports = router;