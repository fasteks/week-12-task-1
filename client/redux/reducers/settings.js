import axios from 'axios'

export const GET_RATES = 'market/settings/GET_RATES'
export const SORT_GOODS = 'market/settings/SORT_GOODS'
export const SORT_CARDS = 'market/settings/SORT_CARDS'
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
        currency: action.curren,
        sum: action.totalSum,
        products: action.updatedProducts,
        cards: action.updatedCards
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

export function sortGoodsServer(by) {
  return async (dispatch, getStore) => {
    const { products } = getStore().goods
    await axios({
      method: 'post',
      url: 'api/v1/sort',
      data: {
        obj: products,
        action: by
      }
    })
      .then(({ data }) => data)
      .then((sortedArray) => {
        dispatch({ type: SORT_GOODS, sortedGoods: sortedArray, sort: by })
      })
      .catch((error) => error)
  }
}

export function sortByServer(obj, by) {
  return async (dispatch, getStore) => {
    await axios({
      method: 'post',
      url: 'api/v1/sortByServer',
      data: {
        obj,
        by
      }
    })
      .then(({ data }) => data)
      .then((sortedArray) => {
        if (obj === SORT_CARDS) {
          const { rates, currency } = getStore().goods
          const cardsArray = sortedArray.map((it) => {
            const currenciedPrice = +it.price * +rates[currency]
            const currenciedPriceFixed = currenciedPrice.toFixed(2)
            return { ...it, priceCurrency: currenciedPriceFixed }
          })
          return dispatch({ type: obj, sortedCards: cardsArray })
        }

        return dispatch({ type: obj, sortedGoods: sortedArray })
      })
      .catch((error) => error)
  }
}

export function changeCurrencyObj(curr) {
  return (dispatch, getState) => {
    const state = getState()
    const { products, rates, currency, cards } = state.goods
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

      dispatch({
        type: CHANGE_CURRENCY,
        curren: curr,
        updatedCards: cardsArray,
        updatedProducts: productsObj,
        totalSum: totalBasketSumFixed
      })
    }
  }
}
