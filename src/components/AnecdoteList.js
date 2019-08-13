import React, {useState} from 'react'
import {RadioGroup, Radio} from 'react-radio-group'
import {vote, toggleImportanceOf} from '../reducers/anecdoteReducer' 

const AnecdoteList = (props) => {

    const [ filter, setFilter ] = useState('all')
    const anecdotes = props.store.getState()
    
    // const voteForAnecdote = (id) => {
    //     props.store.dispatch ({
    //         type: 'ADD_VOTE',
    //         data: { id }
    //     })
    // }

    // const toggleImportanceOf = (id) => {
    //     props.store.dispatch({
    //         type: 'TOGGLE_IMPORTANCE',
    //         data: { id }
    //       })  
    // }

    const selectAnecdotes = (filterValue) => {
        switch(filterValue) {
            case 'imp'      :   return anecdotes.filter(anecdote => anecdote.important).sort(compare)
            case 'notimp'   :   return anecdotes.filter(anecdote => !anecdote.important).sort(compare) 
            default         :   return anecdotes.sort(compare)
        }
    }

    const setFilterValue = (selectedValue) => {
        setFilter(selectedValue)
    }

    const compare = (anecdoteOne, anecdoteTwo) => anecdoteTwo.votes - anecdoteOne.votes
 
    return (
        <div>
            <div className="radio">
                <RadioGroup name="select" onChange={setFilterValue}>
                    Show All:<Radio value="all" defaultChecked={true} />&nbsp;
                    Important:<Radio value="imp" />&nbsp;
                    Not Important:<Radio value="notimp" />&nbsp;
                </RadioGroup>
            </div>
            <h2>Anecdotes</h2>
            {selectAnecdotes(filter).map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                has {anecdote.votes} votes
                <button onClick={() => props.store.dispatch(vote(anecdote.id))}>vote</button>
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