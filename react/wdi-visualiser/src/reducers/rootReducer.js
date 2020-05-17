import { combineReducers } from 'redux';

// import all the reducers into here
import simpleReducer from './simpleReducer';
import mappingReducer from './mappingReducer';

export default combineReducers({
 mappings: mappingReducer
});