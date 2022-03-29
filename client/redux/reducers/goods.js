import axios from 'axios'

const GET_CARDS = 'market/goods/GET_CARDS'
const ADD_TO_BUSKET = 'market/goods/ADD_TO_BUSKET'

const initialState = {
  cards: [],
  products: []
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_CARDS: {
      return {
        ...state,
        cards: action.goods
      }
    }
    case ADD_TO_BUSKET: {
      return {
        ...state,
        products: [...state.products, action.addProduct]
      }
    }
    default:
      return state
  }
}

export function getCards() {
  return async (dispatch) => {
    await axios('/api/v1/goods').then(({ data }) => {
      dispatch({ type: GET_CARDS, goods: data })
    })
  }
}

export function addToBasket(product) {
  return { type: ADD_TO_BUSKET, addProduct: product }
}
