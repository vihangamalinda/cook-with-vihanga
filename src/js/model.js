import {API_URL, RESULTS_PER_PAGE} from "./config.js";
import {getJSON} from "./helpers.js";

export const state = {
    recipe: {},
    searchResult: {
        query: '',
        results: [],
        currentPage:1,
        resultsPerPage:RESULTS_PER_PAGE
    }
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

export const loadSearchRecipes = async (query) => {
    try {
        const data = await getJSON(`${API_URL}?search=${query}`);

        const {recipes} = data.data;

        const value = recipes.map((recipeItem) => {
                return ({
                    id: recipeItem.id,
                    title: recipeItem.title,
                    publisher: recipeItem.publisher,
                    image: recipeItem.image_url,
                })
            }
        )

        state.searchResult.query = query;
        state.searchResult.results = value;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const getSearchResultPage =(page = state.searchResult.currentPage) => {
    state.searchResult.currentPage=page;
    const {resultsPerPage} =  state.searchResult;

    const start = (page - 1) * resultsPerPage;
    const end = page * resultsPerPage;
    console.log(start,end);
    let results = state.searchResult.results.slice(start, end);
    console.log(results);
    return results;
}