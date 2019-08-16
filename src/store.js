import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'

import anecdoteReducer from './reducers/anecdoteReducer';
import filterReducer from './reducers/filterReducer';
import notificationReducer from './reducers/notificationReducer';
import searchTextReducer from './reducers/searchReducer';

const store = createStore(
  combineReducers({
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer,
    searchText: searchTextReducer
  }), composeWithDevTools(applyMiddleware(thunk))
)

export default store