const CHANGE_NAME = 'CHANGE_NAME'

const initialState = {
  name: 'Fin'
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_NAME: {
      return {
        ...state,
        name: action.newName
      }
    }
    default:
      return state
  }
}

export function changeName(inputName) {
  return { type: CHANGE_NAME, newName: inputName }
}
