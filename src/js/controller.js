const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};

const showRecipes = async function () {

    try {
        const response = await fetch("https://forkify-api.jonas.io/api/v2/recipes/5ed6604591c37cdc054bc886");
        const data = await response.json();
        if (!response.ok) throw new Error(`${data.message}  status : ${response.status}`);
        console.log(response);
        console.log(data);
        let {recipe} = data.data;
        recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients
        }
        console.log("recipe V2 modal", recipe);
    } catch (err) {
        debugger;
        alert("Error fetching recipes");
        console.log("Error fetching recipes");
        console.log(err)
    }
}
showRecipes();