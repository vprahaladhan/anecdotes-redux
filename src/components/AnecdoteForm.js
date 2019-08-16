import React from 'react'
import { connect } from 'react-redux'

import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, addNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

    const addNewAnecdote = async (event) => {
        event.preventDefault()
        let anecdote = event.target['new-anecdote'].value
        props.addNotification(anecdote)
        setTimeout(() => props.setNotification(''), 5000)
        event.target['new-anecdote'].value = ''
        props.createAnecdote(anecdote)
    }
    
    return (
        <div>
            <h2>Create new Anecdote</h2>
            <form onSubmit={addNewAnecdote}>
                <div>Anecdote: <input name='new-anecdote' /></div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default 
connect (
    null,
    { 
        createAnecdote,
        addNotification,
        setNotification
    }
)(AnecdoteForm)