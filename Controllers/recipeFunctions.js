const asyncHandler = require("express-async-handler");
const Recipes = require("../Models/recipes");
const Recipe = require("../Models/recipes");

// Show all recipes
const showAllRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipes.find();
  res.status(200).json(recipe);
});

// Get recipe by Title
const getRecipeByTitle = asyncHandler(async (req, res) => {
  const { title } = req.params;
  const recipe = await Recipe.findOne({ title: title });
  if (!recipe) {
    res.status(404);
    throw new Error("Recipe not found");
  }
  res.status(200).json(recipe);
});

// Create a new recipe
const createNewRecipe = asyncHandler(async (req, res) => {
  const { title, ingredients, instructions, cookingTime } = req.body;

  if (!title || !ingredients || !instructions || !cookingTime) {
    res.status(400);
    throw new Error('All fields are mandatory');
  }

  const recipe = await Recipes.create({
    title,
    ingredients,
    instructions,
    cookingTime
  });

  res.status(201).json(recipe);
});

// Update a recipe by ID
const updateRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  if(!recipe){
    res.status(404);
    throw new Error("Recipe not found")
  }

  const updateRecipe = await Recipe.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true}

  );

  res.status(200).json(updateRecipe);

});

// Delete a recipe by ID
const deleteRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findByIdAndDelete(req.params.id);
  if (!recipe) {
    res.status(404);
    throw new Error("Recipe not found");
  }
  res.status(200).json(recipe );
});

module.exports = {
  showAllRecipe,
  getRecipeByTitle,
  createNewRecipe,
  updateRecipe,
  deleteRecipe
};
