import axios from 'axios'
import { addToBasketLog, removeFromBasketLog, sortByLog } from './logs'

const GET_CARDS = 'market/goods/GET_CARDS'
const ADD_TO_BASKET = 'market/goods/ADD_TO_BASKET'
const REMOVE_FROM_BASKET = 'market/goods/REMOVE_FROM_BASKET'
const GET_RATES = 'market/goods/GET_RATES'
const CHANGE_CURRENCY = 'market/goods/CHANGE_CURRENCY'
const SORT_GOODS = 'market/goods/SORT_GOODS'
const SORT_CARDS = 'market/goods/SORT_CARDS'
const USD_CURRENCY = 'USD'

const initialState = {
  cards: [],
  products: [],
  sum: 0,
  rates: {
    [USD_CURRENCY]: 1
  },
  currency: USD_CURRENCY,
  order: 0
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_RATES: {
      return {
        ...state,
        rates: action.getRates
      }
    }
    case GET_CARDS: {
      return {
        ...state,
        cards: action.goods
      }
    }
    case ADD_TO_BASKET: {
      return {
        ...state,
        products: action.addProduct,
        sum: action.updatedSum,
        order: action.addOrder
      }
    }
    case CHANGE_CURRENCY: {
      return {
        ...state,
        currency: action.curren,
        sum: action.totalSum,
        products: action.updatedProducts,
        cards: action.updatedCards
      }
    }
    case REMOVE_FROM_BASKET: {
      return {
        ...state,
        products: action.removeProduct,
        sum: action.updatedSum,
        order: action.decOrder
      }
    }
    case SORT_GOODS: {
      return {
        ...state,
        products: action.sortedGoods
      }
    }
    case SORT_CARDS: {
      return {
        ...state,
        cards: action.sortedCards
      }
    }
    default:
      return state
  }
}

export function getCards() {
  return async (dispatch, useStore) => {
    const store = useStore()
    const { rates, currency } = store.goods
    await axios('/api/v1/goods').then(({ data }) => {
      const cards = data
      const cardsArray = cards.map((it) => {
        const currenciedPrice = +it.price * +rates[currency]
        const currenciedPriceFixed = currenciedPrice.toFixed(2)
        return { ...it, priceCurrency: currenciedPriceFixed }
      })
      dispatch({ type: GET_CARDS, goods: cardsArray })
    })
  }
}

export function getRates() {
  return async (dispatch) => {
    await axios('/api/v1/rates').then(({ data }) => {
      const fixedRates = Object.keys(data).reduce((acc, rec) => {
        return { ...acc, [rec]: (+data[rec]).toFixed(2) }
      }, {})
      dispatch({ type: GET_RATES, getRates: fixedRates })
    })
  }
}

export function sortCards(by) {
  return (dispatch, getStore) => {
    const store = getStore()
    const { cards } = store.goods
    if (by === 'name') {
      const cardsSortedByName = cards.sort((a, b) => {
        return a.title.localeCompare(b.title)
      })
      dispatch(sortByLog(by))
      dispatch({
        type: SORT_CARDS,
        sortedCards: cardsSortedByName
      })
    }
    if (by === 'price') {
      const cardsSortedByPrice = cards.sort((a, b) => {
        return b.price[USD_CURRENCY] - a.price[USD_CURRENCY]
      })
      dispatch(sortByLog(by))
      dispatch({
        type: SORT_CARDS,
        sortedCards: cardsSortedByPrice
      })
    }
  }
}

export function sortGoods(by) {
  return (dispatch, getStore) => {
    const store = getStore()
    const { products } = store.goods
    if (products.length > 0 && by === 'name') {
      const productsSortedByName = products.sort((a, b) => {
        return a.title.localeCompare(b.title)
      })
      dispatch(sortByLog(by))
      dispatch({
        type: SORT_GOODS,
        sortedGoods: productsSortedByName
      })
    }
    if (products.length > 0 && by === 'price') {
      const productsSortedByPrice = products.sort((a, b) => {
        return b.price[USD_CURRENCY] - a.price[USD_CURRENCY]
      })
      dispatch(sortByLog(by))
      dispatch({
        type: SORT_GOODS,
        sortedGoods: productsSortedByPrice
      })
    }
  }
}

export function changeCurrency(curr) {
  return (dispatch, getState) => {
    const state = getState()
    const { products, rates, currency, cards } = state.goods
    if (curr !== currency) {
      const cardsArray = cards.map((it) => {
        const currenciedPrice = +it.price * +rates[curr]
        const currenciedPriceFixed = currenciedPrice.toFixed(2)
        return { ...it, priceCurrency: currenciedPriceFixed }
      })

      const productsArray = products.map((it) => {
        const currenciedPrice = it.price * rates[curr]
        const currenciedPriceFixed = currenciedPrice.toFixed(2)
        const totalCurrenciedPrice = currenciedPriceFixed * it.count
        const totalCurrenciedPriceFixed = totalCurrenciedPrice.toFixed(2)
        return {
          ...it,
          priceCurrency: currenciedPriceFixed,
          totalCurrencyPrice: totalCurrenciedPriceFixed
        }
      })

      const totalBasketSum = productsArray.reduce((acc, rec) => {
        return acc + +rec.totalCurrencyPrice
      }, 0)
      const totalBasketSumFixed = totalBasketSum.toFixed(2)

      dispatch({
        type: CHANGE_CURRENCY,
        curren: curr,
        updatedCards: cardsArray,
        updatedProducts: productsArray,
        totalSum: totalBasketSumFixed
      })
    }
  }
}

export function addToBasket(card) {
  return async (dispatch, getState) => {
    const state = getState()
    const { products, order } = state.goods
    const newOrder = order + 1

    const isCardInBasket = products.find((it) => it.id === card.id)

    if (!isCardInBasket) {
      const newProductObj = { ...card, count: 1, totalCurrencyPrice: card.priceCurrency }
      const updatedProductsList = [...products, newProductObj]
      const totalBasketSum = updatedProductsList.reduce((acc, rec) => {
        return acc + +rec.totalCurrencyPrice
      }, 0)
      const totalBasketSumFixed = totalBasketSum.toFixed(2)
      dispatch(addToBasketLog(card.title))
      dispatch({
        type: ADD_TO_BASKET,
        addProduct: updatedProductsList,
        updatedSum: totalBasketSumFixed,
        addOrder: newOrder
      })
    } else {
      const updatedProductsList = await products.map((obj) => {
        if (obj.id === card.id) {
          const addCount = +obj.count + 1
          const totalCurrenciedPrice = +obj.priceCurrency * addCount
          const totalCurrenciedPriceFixed = totalCurrenciedPrice.toFixed(2)
          return {
            ...obj,
            count: addCount,
            totalCurrencyPrice: totalCurrenciedPriceFixed
          }
        }
        return obj
      })

      const totalBasketSum = updatedProductsList.reduce((acc, rec) => {
        return acc + +rec.totalCurrencyPrice
      }, 0)
      const totalBasketSumFixed = totalBasketSum.toFixed(2)

      dispatch(addToBasketLog(card.title))
      dispatch({
        type: ADD_TO_BASKET,
        addProduct: updatedProductsList,
        updatedSum: totalBasketSumFixed,
        addOrder: newOrder
      })
    }
  }
}

export function removeFromBusket(product) {
  return (dispatch, getStore) => {
    const store = getStore()
    const { products, sum, order } = store.goods
    const newOrder = order - 1

    const updatedProductsArray =
      product.count === 1
        ? products.filter((it) => it.id !== product.id)
        : products.map((obj) => {
            if (obj.id === product.id) {
              const decrease = +obj.count - 1
              const updatedPrice = +obj.totalCurrencyPrice - +obj.priceCurrency
              const updatedPriceFixed = updatedPrice.toFixed(2)
              return { ...obj, count: decrease, totalCurrencyPrice: updatedPriceFixed }
            }
            return obj
          })

    const totalBasketSum = sum - +product.priceCurrency
    const totalBasketSumFixed = totalBasketSum.toFixed(2)

    dispatch(removeFromBasketLog(product.title))
    dispatch({
      type: REMOVE_FROM_BASKET,
      removeProduct: updatedProductsArray,
      decOrder: newOrder,
      updatedSum: totalBasketSumFixed
    })
  }
}
