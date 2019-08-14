import React from 'react'
// import {setNotification} from '../reducers/notificationReducer'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  style.display = props.store.getState().notification ? '' : 'none'

  return (
    <div style={style}>
      {props.store.getState().notification}
    </div>
  )
}

export default Notification