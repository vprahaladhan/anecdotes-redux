import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import { initializeAnecdotes, createAnecdote } from './reducers/anecdoteReducer'

const App = (props) => {

  useEffect(() => { props.initializeAnecdotes() }, [props])

  return (
    <div>
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default connect(null, {initializeAnecdotes, createAnecdote})(App)