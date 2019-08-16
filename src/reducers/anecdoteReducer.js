import getAll from '../services/anecdotes'
import { addAnecdote, updateAnecdote } from '../services/anecdotes'

const compare = (a, b) => {
  return b.votes - a.votes
}

export const vote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await updateAnecdote(anecdote)
    dispatch ({
      type: 'ADD_VOTE',
      data: updatedAnecdote
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const anecdote = await addAnecdote(content)
    dispatch({
      type: 'ADD_ANECDOTE',
      data: anecdote,
    })
  }
}

export const toggleImportanceOf = (id) => {
  return ({
    type: 'TOGGLE_IMPORTANCE',
    data: {id}
  })
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_ANECDOTE'       : return [...state].concat(action.data).sort(compare)

    case 'TOGGLE_IMPORTANCE'  : {
                                  const anecdotes = [...state] 
                                  const anecdote = anecdotes.find(anecdote => anecdote.id === action.data.id)
                                  anecdote.important = !anecdote.important
                                  return anecdotes.sort(compare)
                                }

    case 'INIT_ANECDOTES'     : return action.data

    default                   : return state.sort(compare)
  }
}

export default reducer