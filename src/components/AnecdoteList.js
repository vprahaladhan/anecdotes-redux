import React from 'react'
import { RadioGroup, Radio } from 'react-radio-group'
import { vote, toggleImportanceOf } from '../reducers/anecdoteReducer' 
import { filterChange } from '../reducers/filterReducer';
import { voteNotification, setNotification } from '../reducers/notificationReducer'
import Filter from './Filter'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {

    const { anecdotes, filter, searchText } =   { 
                                                    anecdotes: props.anecdotes, 
                                                    filter: props.filter,
                                                    searchText: props.searchText
                                                }
    
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
        props.filterChange(selectedValue)
    }

    const dispatchToReducers = anecdote => {
        props.vote(anecdote)
        props.voteNotification(anecdote)
        setTimeout(() => props.setNotification(''), 5000)
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
            <div><Filter store={props.store} /></div>
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
                            onChange={() => props.toggleImportanceOf(anecdote.id)}
                            defaultChecked={anecdote.important}
                            />
                </div>
            </div>
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      anecdotes: state.anecdotes,
      filter: state.filter,
      searchText: state.searchText
    }
}

const mapDispatchToProps = {
    vote, 
    toggleImportanceOf,
    filterChange,
    voteNotification,
    setNotification,
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)