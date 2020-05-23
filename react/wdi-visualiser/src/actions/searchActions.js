export const updateSearchResults = (results) => {
    console.log("Search actions running with: ")
    console.log(results)
    return {
    type: "UPDATE_SEARCH_RESULTS",
    payload: {results}
  }
}