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
    tableBody.innerHTML = ''; 
    recipes.forEach(recipe => {
        const row = `<tr data-id="${recipe._id}">
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
        fetchRecipes();
    })
    .catch(error => console.error('Error adding recipe:', error));
}

function deleteRecipe(id) {
    if (confirm('Are you sure you want to delete this recipe?')) {
        fetch(`/api/recipes/${id}`, { method: 'DELETE' })
        .then(() => {
            alert('Recipe deleted successfully');
            fetchRecipes(); 
        })
        .catch(error => console.error('Error deleting recipe:', error));
    }
}

function editRecipe(id) {
    const row = document.querySelector(`#recipesTable tr[data-id="${id}"]`);
    if (!row) {
        console.error("Recipe row not found in the table for id:", id);
        return;
    }

    const [title, ingredients, instructions, cookingTime] = Array.from(row.cells).map(cell => cell.textContent);

    const updatedTitle = prompt("Enter updated title:", title) || title;
    const updatedIngredients = prompt("Enter updated ingredients :", ingredients) || ingredients;
    const updatedInstructions = prompt("Enter updated instructions:", instructions) || instructions;
    const updatedCookingTime = prompt("Enter updated cooking time:", cookingTime) || cookingTime;

    const updatedRecipe = {
        title: updatedTitle,
        ingredients: updatedIngredients,
        instructions: updatedInstructions,
        cookingTime: updatedCookingTime
    };

    fetch(`/api/recipes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedRecipe)
    })
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    })
    .then(() => {
        alert('Recipe updated successfully');
        fetchRecipes(); 
    })
    .catch(error => console.error('Error updating recipe:', error));
}
