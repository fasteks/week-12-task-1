const CHANGE_USER = 'CHANGE_USER'

const initialState = {
  currentUser: 'john'
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
    default:
      return state
  }
}

export function changeUser(newName) {
  return { type: CHANGE_USER, name: newName }
}
