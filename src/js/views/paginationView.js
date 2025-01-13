import View from "./View.js";
import helperInstance from "./viewHelper/paginationHelper.js";
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
    _parentElement = document.querySelector(".pagination");

    _generateMarkup() {
        const {results, resultsPerPage, currentPage} = this._data;
        const numOfPages = Math.ceil(results.length / resultsPerPage);
        console.log(numOfPages);
        console.log(Math.ceil(numOfPages));


        // 2) Currently one first page, and there are more pages
        if (helperInstance.isAtFirstAndHaveMorePages(currentPage, numOfPages)) return this.getNextBtnMarkUp();
        // 3) Currently at middle page, can move previous and next page
        if (helperInstance.isAtMiddleAndHaveMorePages(currentPage, numOfPages)) return (this.getPreviousBtnMarkUp() + this.getNextBtnMarkUp());
        // 4) Currently at the last page, can move previous page
        if (helperInstance.isAtLastAndHaveMorePages(currentPage, numOfPages)) return this.getPreviousBtnMarkUp();
        // 1) Only one page
        if (helperInstance.isAtFirstAndHaveOnlyOnePage(currentPage, numOfPages)) return '';

        return `Vihanga ${numOfPages}`;
    }

    addHandlerClick(handler) {
        this._parentElement.addEventListener("click", e => {
            const clickedBtn = e.target.closest(".btn--inline");

            if (!clickedBtn) return;

            const goToPage = +clickedBtn.dataset.goto;
            handler(goToPage);
        });
    }

    getPreviousBtnMarkUp() {
        const {currentPage} = this._data;
        const previousPage = currentPage - 1;
        return `
        <button data-goto="${previousPage}" class="btn--inline pagination__btn--prev">
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
              </svg>
              <span>Previous ${previousPage}</span>
            </button>
        `;
    }

    getNextBtnMarkUp() {
        const {currentPage} = this._data;
        const nextPage = currentPage + 1;
        return `
         <button data-goto="${nextPage}" class="btn--inline pagination__btn--next">
              <span>Next ${nextPage}</span>
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
              </svg>
            </button> 
        `;
    }
}


export default new PaginationView();