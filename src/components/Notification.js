import React from 'react'
import { connect } from 'react-redux'
import { setNotification, voteNotification, addNotification } from '../reducers/notificationReducer'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  style.display = props.notification ? '' : 'none'

  return (
    <div style={style}>
      {props.notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default 
connect(
  mapStateToProps,
  { setNotification,
    voteNotification,
    addNotification
  }
)(Notification)
