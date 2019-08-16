export const setNotification = (notification) => {
    return ({
        type: 'DO_NOTHING',
        notification
    })
} 

export const voteNotification = (anecdote, timeOutInMilliSecs) => {
  return async dispatch => {
    dispatch({
      type: "VOTE_NOTIFICATION",
      anecdote
    })
    setTimeout(() => {
      dispatch({
        type: 'DO_NOTHING',
        anecdote
      })
    }, timeOutInMilliSecs)
  }
} 

export const addNotification = (content, timeOutInMilliSecs) => {
  return async dispatch => {
    dispatch({
      type: "ADD_NOTIFICATION",
      content
    })
    setTimeout(() => {
      dispatch({
        type: 'DO_NOTHING',
        content
      })
    }, timeOutInMilliSecs)
  }
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