const initialState = {
    ml_params: {
        "ml_type": "", 
        "dep_var": "NY.ADJ.NNTY.CD", 
        "indep_vars": ["NY.ADJ.AEDU.GN.ZS", "SE.SEC.UNER.LO.ZS"],
        "countries": ["ARB", "UKR", "USA", "GBR", "BGR", "SPA", "NOR", "FRO", "MEX"],
        "start_year": 1980,
        "end_year": 2010,
        "ml_specific": {} 
      },
      name: "Jake",
      waiting_for_ml: false,
      model_received: false
}

const modelReducer = (state = initialState, action) => {
    switch (action.type) {

    case 'CHANGE_ML_PARAMS':
      return { 
        ...state, 
        ml_params: { 
            ...state.ml_params, 
            [action.payload.target]: action.payload.value 
        } 
    };

    case 'UPDATE_MODEL':
        return { 
            ...state, 
            results: action.payload.results, 
            type: action.payload.type, 
            model_received: true 
        };

    case 'WAITING_FOR_MODEL':
        return { ...state, waiting_for_ml: true };

    case 'NOT_WAITING':
        return { ...state, waiting_for_ml: false };
    
    case 'ML_TYPE_CHANGE':
        return { 
            ...state, 
            ml_params: { 
                ...state.ml_params, 
                ml_specific: {}
            } 
        };

    default:
      return state;
  } 
};

export default modelReducer;