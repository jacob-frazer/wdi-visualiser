const initialState = {
    query: {},
    results: []
}

const searchReducer = (state = initialState, action) => {
    switch (action.type) {

    case 'UPDATE_SEARCH_RESULTS':
        console.log("Search reducer running: ")
        console.log(action)
        return { ...state, results: action.payload.results };

    default:
      return state;
  } 
};

export default searchReducer;