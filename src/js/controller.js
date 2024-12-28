import * as model from './model';
import recipeView from "./views/recipeView";
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
        alert("Error fetching recipes");
        console.log("Error fetching recipes");
        console.log(err);
    }
}

const init =()=>{
    recipeView.addHandler(controlRecipe);
}
init();