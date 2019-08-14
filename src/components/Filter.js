import React from 'react'
import { searchTextChange } from '../reducers/searchReducer';

const Filter = (props) => {
  const handleChange = (event) => {
    props.store.dispatch(searchTextChange(event.target.value))
  }
  
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter