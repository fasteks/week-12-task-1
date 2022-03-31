import axios from 'axios'

const GET_CARDS = 'market/goods/GET_CARDS'
const ADD_TO_BUSKET = 'market/goods/ADD_TO_BUSKET'
const REMOVE_FROM_BUSKET = 'market/goods/REMOVE_FROM_BUSKET'
const SEE_SUM = 'market/goods/SEE_SUM'
const GET_RATES = 'market/goods/GET_RATES'
const SET_CURRENCY = 'market/goods/SET_CURRENCY'
const USD_CURRENCY = 'USD'

const initialState = {
  cards: [],
  products: [],
  sum: 0,
  rates: {
    [USD_CURRENCY]: 1
  },
  currency: USD_CURRENCY
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
        products: action.addProduct,
        sum: action.updatedSum
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
    case GET_RATES: {
      return {
        ...state,
        rates: action.getRate
      }
    }
    case SET_CURRENCY: {
      return {
        ...state,
        currency: action.curren
      }
    }
    default:
      return state
  }
}

// export function getCards() {
//   return async (dispatch) => {
//     await axios('/api/v1/goods').then(({ data }) => {
//       dispatch({ type: GET_CARDS, goods: data })
//     })
//   }
// }

export function getCards() {
  return async (dispatch, getState) => {
    const state = getState()
    const { rates, currency } = state.goods
    await axios('/api/v1/goods').then(({ data }) => {
      const setPrice = () => {
        const cardsArray = data.map((it) => {
          const currencyPrice = +it.price * +rates[currency]
          const currencyPriceFixed = currencyPrice.toFixed(2)
          return { ...it, price: currencyPriceFixed }
        })
        return cardsArray
      }
      dispatch({ type: GET_CARDS, goods: setPrice() })
    })
  }
}

// export function addToBasket(product) {
//   return { type: ADD_TO_BUSKET, addProduct: product }
// }

export function addToBasket(card) {
  return (dispatch, getState) => {
    const state = getState()
    const { cards, products, rates, currency } = state.goods

    const lookForCard = () => {
      // if (products.length > 0) {
      const isCardInBasket = products.find((it) => it.id === card.id)

      if (!isCardInBasket) {
        const neededCard = cards.find((it) => it.id === card.id)
        const totalPrice = card.price * +rates[currency]
        const newProductObj = { ...neededCard, count: 1, price: totalPrice }
        return [...products, newProductObj]
      }

      const updatedProductsList = products.map((obj) => {
        if (obj.id === card.id) {
          const addCount = +obj.count + 1
          const totalPrice = card.price * +rates[currency]
          const addingOneMoreProduct = {
            ...obj,
            count: addCount,
            price: totalPrice
          }
          return addingOneMoreProduct
        }
        return obj
      })
      return updatedProductsList
      // }
      // const neededCard = cards.find((it) => it.id === card.id)
      // const newProductObj = { ...neededCard, count: 1, price: card.price * +rates[currency] }
      // return [newProductObj]
    }

    const calcSum = () => {
      const intialState = card.price * +rates[currency]
      const calculatedSum = products.reduce(
        (acc, rec) => acc + rec.count * rec.price * +rates[currency],
        intialState
      )
      return calculatedSum.toFixed(2)
    }

    dispatch({ type: ADD_TO_BUSKET, addProduct: lookForCard(), updatedSum: calcSum() })
  }
}

export function removeFromBusket(list) {
  return { type: REMOVE_FROM_BUSKET, removeProduct: list }
}

// export function getSum(digit) {
//   return { type: SEE_SUM, number: digit }
// }

// export function getSum() {
//   return (dispatch, getState) => {
//     const state = getState()
//     const { products, rates, currency } = state.goods

//     const calcSum = () => {
//       const intialState = card.price * +rates[currency]
//       const calculatedSum = products.reduce(
//         (acc, rec) => acc + rec.count * rec.price * +rates[currency],
//         intialState
//       )
//       return calculatedSum
//     }
//     dispatch({ type: SEE_SUM, updatedSum: calcSum() })
//   }
// }

export function getRates() {
  return async (dispatch) => {
    await axios('/api/v1/rates').then(({ data }) => {
      dispatch({ type: GET_RATES, getRate: data })
    })
  }
}

// export function getRates() {
//   return async (dispatch) => {
//     await axios('/api/v1/rates').then(({ data }) => {
//       const fixedRates = Object.keys(data).reduce((acc, rec) => {
//         return { ...acc, [rec]: (+data[rec]).toFixed(2) }
//       }, {})
//       dispatch({ type: GET_RATES, getRate: fixedRates })
//     })
//   }
// }

export function setCurrency(str) {
  return { type: SET_CURRENCY, curren: str }
}

// const CHANGE_CURRENCY = 'market/goods/CHANGE_CURRENCY'

// export function changeCurrency(cur) {
//   return (dispatch, getState) => {
//     const state = getState()
//     const { products } = state.goods

//     dispatch({ type: CHANGE_CURRENCY })
//   }
// }
