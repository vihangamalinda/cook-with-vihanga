import * as model from './model';
import recipeView from "./views/recipeView";
import searchView from "./views/searchView";
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const controlRecipe = async function () {
    const hashCode = window.location.hash;
    const recipeId = hashCode.slice(1);

    // Adding a guard
    if (!recipeId) return;

    try {
        recipeView.renderSpinner();
        //1) loading recipe
        await model.loadRecipe(recipeId);
        // get state
        const {recipe} = model.state;
        // 2) Rendering recipes
        recipeView.render(recipe);
    } catch (err) {
        recipeView.renderError();
    }
}

const controlSearchResults = async function (e) {
    try {
        // 1) Get Search query
        const query = await searchView.getQuery();
        if (!query) return;

        // 2) Load query related data
        await model.loadSearchRecipes(query);
        console.log(model.state.searchResult);
    } catch (e) {
        console.error(e);
        throw e;
    }
}

const init = () => {
    recipeView.addHandlerRender(controlRecipe);
    searchView.addHandlerSearch(controlSearchResults);
}
init();