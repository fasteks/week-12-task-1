import axios from 'axios'

const GET_CARDS = 'market/goods/GET_CARDS'
const ADD_TO_BUSKET = 'market/goods/ADD_TO_BUSKET'
const REMOVE_FROM_BUSKET = 'market/goods/REMOVE_FROM_BUSKET'
const SEE_SUM = 'market/goods/SEE_SUM'

const initialState = {
  cards: [],
  products: [],
  sum: 0
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
        products: action.addProduct
      }
    }
    case REMOVE_FROM_BUSKET: {
      return {
        ...state,
        products: action.removeProduct
      }
    }
    case SEE_SUM: {
      return {
        ...state,
        sum: action.number
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

export function removeFromBusket(list) {
  return { type: REMOVE_FROM_BUSKET, removeProduct: list }
}

export function getSum(digit) {
  return { type: SEE_SUM, number: digit }
}