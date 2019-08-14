import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import App from './App'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer';
import notificationReducer from './reducers/notificationReducer'
import searchTextReducer from './reducers/searchReducer';

// const reducer = combineReducers({
//   anecdotes: anecdoteReducer,
//   notification: notificationReducer
// })

const store = createStore(
  combineReducers({
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer,
    searchText: searchTextReducer
  })
)

const render = () => {
  ReactDOM.render(<App store={store} />, document.getElementById('root'))
}

render()
store.subscribe(render)