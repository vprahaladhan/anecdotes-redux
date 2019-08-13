const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    important: Math.random() > 0.5,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const compare = (a, b) => {
  return b.votes - a.votes
}

export const vote = (id) => {
  console.log("In vote of anecdoteReducer.js")
  return ({
    type: 'ADD_VOTE',
    data: { id }
  })
}

export const createAnecdote = (anecdote) => {
  return ({
    type: 'ADD_ANECDOTE',
    data: asObject(anecdote)
  })
}

export const toggleImportanceOf = (id) => {
  return ({
    type: 'TOGGLE_IMPORTANCE',
    data: {id}
  })
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'ADD_VOTE'           : {
                                  const anecdotes = [...state]
                                  anecdotes.find(anecdote => anecdote.id === action.data.id).votes++
                                  return anecdotes.sort(compare)
                                }

    case 'ADD_ANECDOTE'       : return state.concat(action.data).sort(compare)

    case 'TOGGLE_IMPORTANCE'  : {
                                  const anecdotes = [...state]
                                  const anecdote = anecdotes.find(anecdote => anecdote.id === action.data.id)
                                  anecdote.important = !anecdote.important
                                  return anecdotes.sort(compare)
                                }

    default                   : return state.sort(compare)
  }
}

export default reducer