import React from 'react'
import { createStore } from 'redux'
import rootReducer from './reducers/rootReducer'

import mappingReducer from './reducers/mappingReducer';

// can put middleware in here
const store = createStore(rootReducer)

console.log("store state is:  ")
console.log(store.getState())

export default store 