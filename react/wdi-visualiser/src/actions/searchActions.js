export const updateSearchResults = (results) => {
    return {
    type: "UPDATE_SEARCH_RESULTS",
    payload: {results}
  }
}