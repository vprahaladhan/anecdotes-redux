export const searchTextChange = searchText => {
    return {
      type: 'SEARCH_TEXT',
      searchText
    }
}

const searchTextReducer = (state = '', action) => {
    switch (action.type) {
      case 'SEARCH_TEXT': return action.searchText
      default           : return state
    }
}

export default searchTextReducer