import { combineReducers } from 'redux';

// import all the reducers into here
import mappingReducer from './mappingReducer';
import modelReducer from './modelReducer';
import displayReducer from './displayReducer';

export default combineReducers({
 mappings: mappingReducer,
 model: modelReducer,
 display: displayReducer
});