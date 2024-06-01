const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'], 
  },
  ingredients: {
    type: String,
    required: [true, 'Ingredients are required'], 
  },
  instructions: {
    type: String,
    required: [true, 'Instructions are required'], 
  },
  cookingTime: {
    type: String,
    required: [true, 'Cooking time is required'], 
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
