export const setIsLoading = (state, value) => {
    state.isLoading = value;
}

export const setCharacters = (state, [data, page]) => {

    if(data.results.length <= 0) {

        state.characters = [];
        state.isLoading = false;
        state.pageNumber = 1;
        state.maxPages = 1;
        return;

    }

    state.characters = data.results;
    state.isLoading = false;
    state.pageNumber = page;
    state.maxPages = data.info.pages;
    state.numberMaxOfCharacters = data.info.count;
}