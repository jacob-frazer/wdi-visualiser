const initialState = {
    mappings: {},
    mappings_received: null
}

const mappingReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'ADD_MAPPINGS':
        console.log("The reducer was called with add mappings")
        console.log(action.payload)
      return { ...state, mappings: action.payload, mappings_received: true  };
    case 'WAITING_MAPPINGS':
        console.log("The reducer was called with waiting mappings")
      return { ...state, mappings_received: false};
    default:
      return state;
  } 
};

export default mappingReducer;