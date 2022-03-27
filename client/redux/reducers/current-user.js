import axios from 'axios'

const CHANGE_USER = 'git-repos/redux/user/CHANGE_USER'
const GET_USERS_LIST = 'git-repos/redux/user/GET_USERS_LIST'

const initialState = {
  currentUser: 'john',
  usersList: []
}

/* eslint-disable default-param-last */
export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_USER: {
      return {
        ...state,
        currentUser: action.name
      }
    }
    case GET_USERS_LIST: {
      return {
        ...state,
        usersList: action.list
      }
    }
    default:
      return state
  }
}

export function changeUser(name) {
  return { type: CHANGE_USER, name }
}
export function getUsersList() {
  return (dispatch, getState) => {
    const store = getState()
    const { currentUser } = store.user
    console.log(getState())
    axios(`https://api.github.com/users/${currentUser}/repos`).then(({ data }) => {
      dispatch({ type: GET_USERS_LIST, list: data })
    })
  }
}
