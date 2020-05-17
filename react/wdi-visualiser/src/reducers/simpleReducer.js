const reducer = (state = {}, action) => {switch (action.type) {
    case 'HELLO_REACT':
      return { ...state, say : 'Hello World Redux'  };
    case 'CHANGE_COLOUR':
      return { ...state, colour : !state.colour}
    default:
      return state;
  }
  
};

export default reducer;