import axios from 'axios'
import { UPDATE_CARDS } from './cards'
import { UPDATE_PRODUCTS } from './goods'

export const GET_RATES = 'market/settings/GET_RATES'
export const CHANGE_CURRENCY = 'market/settings/CHANGE_CURRENCY'
export const USD_CURRENCY = 'USD'
export const EUR_CURRENCY = 'EUR'
export const CAD_CURRENCY = 'CAD'

const initialState = {
  rates: {
    [USD_CURRENCY]: 1
  },
  currency: USD_CURRENCY
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_RATES: {
      return {
        ...state,
        rates: action.getRates
      }
    }
    case CHANGE_CURRENCY: {
      return {
        ...state,
        currency: action.curren
      }
    }
    default:
      return state
  }
}

export function getRates() {
  return async (dispatch) => {
    await axios('/api/v1/rates')
      .then(({ data }) => {
        const fixedRates = Object.keys(data).reduce((acc, rec) => {
          return { ...acc, [rec]: (+data[rec]).toFixed(2) }
        }, {})
        dispatch({ type: GET_RATES, getRates: fixedRates })
      })
      .catch((error) => error)
  }
}

export function changeCurrencyObj(curr) {
  return (dispatch, getState) => {
    const state = getState()
    const { products } = state.goods
    const { rates, currency } = state.settings
    const { cards } = state.cards
    if (curr !== currency) {
      const cardsArray = cards.map((it) => {
        const currenciedPrice = +it.price * +rates[curr]
        const currenciedPriceFixed = currenciedPrice.toFixed(2)
        return { ...it, priceCurrency: currenciedPriceFixed }
      })

      const productsObj = Object.keys(products).reduce((acc, rec) => {
        const product = products[rec]
        const currenciedPrice = product.price * rates[curr]
        const currenciedPriceFixed = currenciedPrice.toFixed(2)
        const totalCurrenciedPrice = currenciedPriceFixed * product.count
        const totalCurrenciedPriceFixed = totalCurrenciedPrice.toFixed(2)
        return {
          ...acc,
          [product.id]: {
            ...product,
            priceCurrency: currenciedPriceFixed,
            totalCurrencyPrice: totalCurrenciedPriceFixed
          }
        }
      }, products)

      const totalBasketSum = Object.keys(productsObj).reduce((acc, rec) => {
        return acc + +productsObj[rec].totalCurrencyPrice
      }, 0)
      const totalBasketSumFixed = totalBasketSum.toFixed(2)

      dispatch({ type: CHANGE_CURRENCY, curren: curr })
      dispatch({ type: UPDATE_CARDS, payload: cardsArray })
      dispatch({
        type: UPDATE_PRODUCTS,
        updatedProducts: productsObj,
        totalSum: totalBasketSumFixed
      })
    }
  }
}
