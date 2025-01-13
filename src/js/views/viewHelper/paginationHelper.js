let instance;

class paginationHelper {
    constructor() {
        if (instance) {
            throw new Error("paginationHelper instance exists can not create more");
        }
    }

    isAtFirstAndHaveMorePages(currentPage, numOfPages) {
        return currentPage === 1 && numOfPages > 1;
    }

    isAtLastAndHaveMorePages(currentPage, numOfPages) {
        return currentPage === numOfPages && currentPage !== 1;
    }

    isAtFirstAndHaveOnlyOnePage(currentPage, numOfPages) {
        return numOfPages === currentPage && currentPage === 1;
    }

    isAtMiddleAndHaveMorePages(currentPage, numOfPages) {
        return currentPage !== 1 && numOfPages > 1 && currentPage !== numOfPages;
    }
}

const helperInstance = Object.freeze(new paginationHelper());
export default helperInstance;