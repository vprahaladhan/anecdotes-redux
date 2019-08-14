export const setNotification = (notification) => {
    return ({
        type: 'DO_NOTHING',
        notification
    })
} 

export const voteNotification = (anecdote) => {
  return ({
      type: 'VOTE_NOTIFICATION',
      anecdote
  })
} 

export const addNotification = (content) => {
  return ({
      type: 'ADD_NOTIFICATION',
      content
  })
} 


const notificationReducer = (state = null, action) => {
    switch (action.type) {
      case 'VOTE_NOTIFICATION': return `you voted '${action.anecdote.content}'`
      case 'ADD_NOTIFICATION' : return `added new anecdote '${action.content}'`
      case 'DO_NOTHING'       : return null 
      default                 : return state
    }
  }

  export default notificationReducer