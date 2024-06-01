 const asyncHandler = require("express-async-handler")
 const recipe = require("../models/recipes")



// Show all recipes
const showAllRecipe = asyncHandler(async (req, res) => {
    const recipes = await Recipe.find();
    res.json(recipes);
  });
  
  // Get recipe by ID
  const getRecipeById = asyncHandler(async (req, res) => {
   
  });
  
  // Create a new recipe
  const createNewRecipe = asyncHandler(async (req, res) => {
  
  });
  
  // Update a recipe by ID
  const updateRecipe = asyncHandler(async (req, res) => {
    
  });
  
  // Delete a recipe by ID
  const deleteRecipe = asyncHandler(async (req, res) => {
   
  });