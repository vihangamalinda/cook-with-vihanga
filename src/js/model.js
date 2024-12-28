import {API_URL} from "./config.js";
import {getJSON} from "./helpers.js";

export const state = {
    recipe: {},
}

export const loadRecipe = async (recipeId) => {
    try {
        // get data from API
        const data = await getJSON(`${API_URL}/${recipeId}`);
        console.log(data);

        const {recipe} = data.data;
        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients
        }
        console.log("recipe V2 modal", state.recipe);
    } catch (err) {
        throw err;
    }
}