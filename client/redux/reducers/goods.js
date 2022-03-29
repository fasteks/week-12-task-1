import axios from 'axios'

const GET_GOODS = 'market/goods/GET_GOODS'

const initialState = {
  cards: [],
  products: []
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_GOODS: {
      return {
        ...state,
        cards: action.goods
      }
    }
    default:
      return state
  }
}

export function getGoods() {
  return async (dispatch) => {
    await axios('/api/v1/goods').then(({ data }) => {
      dispatch({ type: GET_GOODS, goods: data })
    })
  }
}
