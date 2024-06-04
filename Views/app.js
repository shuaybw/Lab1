document.addEventListener('DOMContentLoaded', function() {
    fetchRecipes();
    const form = document.getElementById('addRecipeForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        addRecipe();
    });
});

function fetchRecipes() {
    fetch('/api/recipes')
    .then(response => response.json())
    .then(recipes => displayRecipes(recipes))
    .catch(error => console.error('Error loading recipes:', error));
}

function displayRecipes(recipes) {
    const tableBody = document.getElementById('recipesTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear existing entries
    recipes.forEach(recipe => {
        const row = `<tr>
            <td>${recipe.title}</td>
            <td>${recipe.ingredients}</td>
            <td>${recipe.instructions}</td>
            <td>${recipe.cookingTime} minutes</td>
            <td>
                <button onclick="deleteRecipe('${recipe._id}')">Delete</button>
                <button onclick="editRecipe('${recipe._id}')">Edit</button>
            </td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

function addRecipe() {
    const recipeData = {
        title: document.getElementById('title').value,
        ingredients: document.getElementById('ingredients').value,
        instructions: document.getElementById('instructions').value,
        cookingTime: document.getElementById('cookingTime').value
    };
    fetch('/api/recipes', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(recipeData)
    })
    .then(response => response.json())
    .then(data => {
        alert('Recipe added successfully');
        fetchRecipes(); // Refresh the recipe list
    })
    .catch(error => console.error('Error adding recipe:', error));
}

function deleteRecipe(id) {
    if (confirm('Are you sure you want to delete this recipe?')) {
        fetch(`/api/recipes/${id}`, { method: 'DELETE' })
        .then(() => {
            alert('Recipe deleted successfully');
            fetchRecipes(); // Refresh the recipe list
        })
        .catch(error => console.error('Error deleting recipe:', error));
    }
}

function editRecipe(id) {
    // Example placeholder function to initiate edit
    console.log('Edit function to be implemented:', id);
}
