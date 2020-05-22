const initialState = {
    display: 'query'
}

const displayReducer = (state = initialState, action) => {
    switch (action.type) {

    case 'SHOW_QUERY_BUILDER':
        return { ...state, display: 'query' };

    case 'SHOW_RESULTS':
        return { ...state, display: 'results' };

    case 'SHOW_MODEL_SEARCH':
            return { ...state, display: 'modelSearch' };

    default:
      return state;
  } 
};

export default displayReducer;