import React from 'react'
import { RadioGroup, Radio } from 'react-radio-group'
import { vote, toggleImportanceOf } from '../reducers/anecdoteReducer' 
import { filterChange } from '../reducers/filterReducer';
import { voteNotification, setNotification } from '../reducers/notificationReducer'
import Filter from './Filter'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {
    const setFilterValue = (selectedValue) => {
        setFilter(props, selectedValue)
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
            {props.anecdotes.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                has {anecdote.votes} votes
                <button onClick={() => dispatchToReducers(props, anecdote)}>vote</button>
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

const anecdotesToShow = (state) => {
    const searchedAnecdotes = searchAnecdotes(state)
    switch(state.filter) {
        case 'IMPORTANT'    :   return searchedAnecdotes.filter(anecdote => anecdote.important)
        case 'NONIMPORTANT' :   return searchedAnecdotes.filter(anecdote => !anecdote.important) 
        default             :   return searchedAnecdotes
    }
}

const searchAnecdotes = (state) => {
    return state.anecdotes.filter(anecdote => {
        return anecdote.content.toLowerCase().includes(state.searchText.toLowerCase())
    })
}

const dispatchToReducers = (props, anecdote) => {
    props.vote(anecdote)
    props.voteNotification(anecdote)
    setTimeout(() => props.setNotification(''), 5000)
}

const setFilter = (props, selectedValue) => {
    props.filterChange(selectedValue)
}

const mapStateToProps = (state) => {
    return {
      anecdotes: anecdotesToShow(state),
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