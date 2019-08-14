import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { addNotification, setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = (props) => {

    const addAnecdote = (event) => {
        event.preventDefault()
        const anecdote = event.target['new-anecdote'].value
        props.store.dispatch(createAnecdote(anecdote))
        props.store.dispatch(addNotification(anecdote))
        setTimeout(() => props.store.dispatch(setNotification('')), 5000)
        event.target['new-anecdote'].value = ''
    }
    
    return (
        <div>
            <h2>Create new Anecdote</h2>
            <form onSubmit={addAnecdote}>
                <div>Anecdote: <input name='new-anecdote' /></div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm