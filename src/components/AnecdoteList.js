import React from 'react'
import {RadioGroup, Radio} from 'react-radio-group'
import {vote, toggleImportanceOf} from '../reducers/anecdoteReducer' 
import { filterChange } from '../reducers/filterReducer';
import {voteNotification, setNotification} from '../reducers/notificationReducer'
import Filter from './Filter'

const AnecdoteList = (props) => {

    const { anecdotes, filter, searchText } = props.store.getState()
    
    const selectAnecdotes = (filter) => {
        const searchedAnecdotes = searchAnecdotes()
        switch(filter) {
            case 'IMPORTANT'    :   return searchedAnecdotes.filter(anecdote => anecdote.important)
            case 'NONIMPORTANT' :   return searchedAnecdotes.filter(anecdote => !anecdote.important) 
            default             :   return searchedAnecdotes
        }
    }

    const searchAnecdotes = () => {
        return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(searchText.toLowerCase()))
    }

    const setFilterValue = (selectedValue) => {
        props.store.dispatch(filterChange(selectedValue))
    }

    const dispatchToReducers = anecdote => {
        props.store.dispatch(vote(anecdote))
        props.store.dispatch(voteNotification(anecdote))
        setTimeout(() => props.store.dispatch(setNotification('')), 5000)
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            <h3><div className="radio">
                <RadioGroup name="select" onChange={setFilterValue}>
                    Show All:<Radio value="NOFILTER" defaultChecked={true} />&nbsp;
                    Important:<Radio value="IMPORTANT" />&nbsp;
                    Not Important:<Radio value="NONIMPORTANT" />&nbsp;
                </RadioGroup>
            </div></h3>
            <div><Filter store={props.store} onChange/></div>
            {selectAnecdotes(filter).map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                has {anecdote.votes} votes
                <button onClick={() => dispatchToReducers(anecdote)}>vote</button>
                </div>
                <div>
                    Important: <input 
                            type='checkbox' 
                            name='filter' 
                            onChange={() => props.store.dispatch(toggleImportanceOf(anecdote.id))}
                            defaultChecked={anecdote.important}
                            />
                </div>
            </div>
            )}
        </div>
    )
}

export default AnecdoteList