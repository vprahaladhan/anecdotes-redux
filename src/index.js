import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './App';
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
  })
)

const render = () => {
  ReactDOM.render(  
    <Provider store={store}>
      <App />
    </Provider>, 
    document.getElementById('root'))
}

render()
store.subscribe(render)