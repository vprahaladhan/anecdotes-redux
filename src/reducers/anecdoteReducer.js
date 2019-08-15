const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    important: Math.random() > 0.5,
    id: getId(),
    votes: 0
  }
}

const compare = (a, b) => {
  return b.votes - a.votes
}

export const vote = (anecdote) => {
  return ({
    type: 'ADD_VOTE',
    data: { id: anecdote.id }
  })
}

export const createAnecdote = (anecdote) => {
  return ({
    type: 'ADD_ANECDOTE',
    data: anecdote
  })
}

export const toggleImportanceOf = (id) => {
  return ({
    type: 'TOGGLE_IMPORTANCE',
    data: {id}
  })
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  }
}

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_VOTE'           : {
                                  const anecdotes = [...state]
                                  anecdotes.find(anecdote => anecdote.id === action.data.id).votes++
                                  return anecdotes.sort(compare)
                                }

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