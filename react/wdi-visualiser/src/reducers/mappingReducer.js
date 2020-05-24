const initialState = {
    mappings: {},
    reversed_mappings: {},
    mappings_received: null
}

const mappingReducer = (state = initialState, action) => {
    switch (action.type) {

    case 'ADD_MAPPINGS':
      return { ...state, mappings: action.payload };

    case 'ADD_REVERSED_MAPPINGS':
      return { ...state, reversed_mappings: action.payload };

    case 'RECEIVED_MAPPINGS':
      return { ...state, mappings_received: true};

    case 'WAITING_MAPPINGS':
      return { ...state, mappings_received: false};

    default:
      return state;
  } 
};

export default mappingReducer;