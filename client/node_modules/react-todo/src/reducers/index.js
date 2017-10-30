import { combineReducers } from 'redux'

// Import all reducers
import data from './data'
import info from './info'

// Combine all reducers
const rootReducer = combineReducers({
  data,
  info
})

export default rootReducer
