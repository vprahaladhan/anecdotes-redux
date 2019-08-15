import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const addAnecdote = async content => {
  const response = await axios.post(baseUrl, {content: content, votes: 0})
  return response.data
}

export default getAll