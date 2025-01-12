import View from "./View";


class ResultView extends View {
    _parentElement = document.querySelector(".results");
    _data;
    _errorMessage = 'No results were found. Please try to search another recipe name. 👩🏾‍🍳';

    _generateMarkup() {
        return this._data.map(this.#generateMarkupPreview).join("");
    }

    #generateMarkupPreview(recipe) {
        const {id, image, publisher, title} = recipe;
        return `
         <li class="preview">
              <a class="preview__link" href="#${id}">
                <figure class="preview__fig">
                  <img src="${image}" alt="${title}" />
                </figure>
                <div class="preview__data">
                  <h4 class="preview__title">${title}</h4>
                  <p class="preview__publisher">${publisher}</p>
                  <div class="preview__user-generated">
                  </div>
                </div>
              </a>
            </li>`
    }

}

export default new ResultView();