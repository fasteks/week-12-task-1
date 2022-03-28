import axios from 'axios'

const CHANGE_NAME = 'CHANGE_NAME'
const GET_USERS = 'GET_USERS'

const initialState = {
  name: undefined,
  list: []
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_NAME: {
      return {
        ...state,
        name: action.newName
      }
    }
    case GET_USERS: {
      return {
        ...state,
        list: action.newList
      }
    }
    default:
      return state
  }
}

export function changeName(inputName) {
  return { type: CHANGE_NAME, newName: inputName }
}

export function getUsers() {
  return (dispatch, getState) => {
    const store = getState()
    const { name } = store.user
    axios(`https://api.github.com/users/${name}/repos`).then(({ data }) => {
      dispatch({ type: GET_USERS, newList: data })
    })
  }
}
