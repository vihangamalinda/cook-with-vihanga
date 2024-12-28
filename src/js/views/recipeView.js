import icons from 'url:../../img/icons.svg';
import {Fraction} from "fractional";

class RecipeView {
    #parentElement = document.querySelector(".recipe");
    #data;

    render(data) {
        this.#data = data;

        const markup = this.#generateMarkup();
        //  Removing initial data
        this.#clear();
        // recipeContainer.innerHTML ='';
        this.#parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    #clear() {
        this.#parentElement.innerHTML = '';
    }

    addHandler(handler) {
        const recipeViewEventTypes = ['hashchange', 'load'];
        recipeViewEventTypes.forEach((eventType) => window.addEventListener(eventType, handler));
    }

    #generateMarkup() {
        return `<figure class="recipe__fig">
          <img src="${this.#data.image}" alt="Tomato" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this.#data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${this.#data.cookingTime}</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${this.#data.servings}</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${icons}#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${this.#data.ingredients.map(this.#generateIngredientsMarkup).join("")}
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${this.#data.publisher}</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="http://thepioneerwoman.com/cooking/pasta-with-tomato-cream-sauce/"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
          </a>
        </div>`
    }

    #generateIngredientsMarkup(ingredient) {
        const validIngredient = (impureData) => impureData ? impureData : "";
        const getFractionalValue = (value) => validIngredient(value) ? new Fraction(value).toString() : '';
        console.log(ingredient);
        // debugger;
        return `<li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${getFractionalValue(ingredient.quantity)}</div>
              <div class="recipe__description">
                <span class="recipe__unit">${validIngredient(ingredient.unit)}</span>
                ${ingredient.description}
              </div>
            </li>`;
    }

    renderSpinner() {
        const markUp = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>`;

        this.#clear();
        this.#parentElement.insertAdjacentHTML('afterbegin', markUp);
    }

}

export default new RecipeView();