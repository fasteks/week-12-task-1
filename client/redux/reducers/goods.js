import axios from 'axios'

const GET_CARDS = 'market/goods/GET_CARDS'
const GET_RATES = 'market/goods/GET_RATES'
export const ADD_TO_BASKET = 'market/goods/ADD_TO_BASKET'
export const REMOVE_FROM_BASKET = 'market/goods/REMOVE_FROM_BASKET'
export const CHANGE_CURRENCY = 'market/goods/CHANGE_CURRENCY'
export const SORT_GOODS = 'market/goods/SORT_GOODS'
export const SORT_CARDS = 'market/goods/SORT_CARDS'
export const USD_CURRENCY = 'USD'
export const EUR_CURRENCY = 'EUR'
export const CAD_CURRENCY = 'CAD'

// const initialState = {
//   cards: [],
//   products: [],
//   sum: 0,
//   rates: {
//     [USD_CURRENCY]: 1
//   },
//   currency: USD_CURRENCY,
//   order: 0
// }

const initialState = {
  cards: [],
  products: {},
  sum: (0).toFixed(2),
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
      // return {
      //   ...state,
      //   products: action.addProduct,
      //   sum: action.updatedSum,
      //   order: action.addOrder
      // }
      return {
        ...state,
        products: action.updateProducts,
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
      // return {
      //   ...state,
      //   products: action.removeProduct,
      //   sum: action.updatedSum,
      //   order: action.decOrder
      // }
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
    await axios('/api/v1/goods')
      .then(({ data }) => {
        const cards = data
        const cardsArray = cards.map((it) => {
          const currenciedPrice = +it.price * +rates[currency]
          const currenciedPriceFixed = currenciedPrice.toFixed(2)
          return { ...it, priceCurrency: currenciedPriceFixed }
        })
        dispatch({ type: GET_CARDS, goods: cardsArray })
      })
      .catch((error) => error)
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

export function sortCardsServer(by) {
  return async (dispatch, useState) => {
    const { rates, currency, cards } = useState().goods
    await axios({
      method: 'post',
      url: 'api/v1/sort',
      data: {
        obj: cards,
        action: by
      }
    })
      .then(({ data }) => data)
      .then((sortedArray) => {
        const cardsArray = sortedArray.map((it) => {
          const currenciedPrice = +it.price * +rates[currency]
          const currenciedPriceFixed = currenciedPrice.toFixed(2)
          return { ...it, priceCurrency: currenciedPriceFixed }
        })

        dispatch({ type: SORT_CARDS, sortedCards: cardsArray, sort: by })
      })
      .catch((error) => error)
  }
}

export function sortGoodsServer(by) {
  return async (dispatch, useState) => {
    const { products } = useState().goods
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

// export function changeCurrency(curr) {
//   return (dispatch, getState) => {
//     const state = getState()
//     const { products, rates, currency, cards } = state.goods
//     if (curr !== currency) {
//       const cardsArray = cards.map((it) => {
//         const currenciedPrice = +it.price * +rates[curr]
//         const currenciedPriceFixed = currenciedPrice.toFixed(2)
//         return { ...it, priceCurrency: currenciedPriceFixed }
//       })

//       const productsArray = products.map((it) => {
//         const currenciedPrice = it.price * rates[curr]
//         const currenciedPriceFixed = currenciedPrice.toFixed(2)
//         const totalCurrenciedPrice = currenciedPriceFixed * it.count
//         const totalCurrenciedPriceFixed = totalCurrenciedPrice.toFixed(2)
//         return {
//           ...it,
//           priceCurrency: currenciedPriceFixed,
//           totalCurrencyPrice: totalCurrenciedPriceFixed
//         }
//       })

//       const totalBasketSum = productsArray.reduce((acc, rec) => {
//         return acc + +rec.totalCurrencyPrice
//       }, 0)
//       const totalBasketSumFixed = totalBasketSum.toFixed(2)

//       dispatch({
//         type: CHANGE_CURRENCY,
//         curren: curr,
//         updatedCards: cardsArray,
//         updatedProducts: productsArray,
//         totalSum: totalBasketSumFixed
//       })
//     }
//   }
// }

export function addToBasketObj(card) {
  return async (dispatch, getState) => {
    const state = getState()
    const { products, sum, order } = state.goods
    const newOrder = +order + 1
    const totalBasketSum = +sum + +card.priceCurrency
    const totalBasketSumFixed = totalBasketSum.toFixed(2)

    if (typeof products[card.id] === 'undefined') {
      const updatedProducts = {
        ...products,
        [card.id]: { ...card, count: 1, totalCurrencyPrice: card.priceCurrency }
      }
      return dispatch({
        type: ADD_TO_BASKET,
        updateProducts: updatedProducts,
        updatedSum: totalBasketSumFixed,
        addOrder: newOrder
      })
    }

    const updatedProducts = {
      ...products,
      [card.id]: {
        ...products[card.id],
        count: +[products[card.id].count] + 1,
        totalCurrencyPrice: (
          +[products[card.id].totalCurrencyPrice] + +[card.priceCurrency]
        ).toFixed(2)
      }
    }
    return dispatch({
      type: ADD_TO_BASKET,
      updateProducts: updatedProducts,
      updatedSum: totalBasketSumFixed,
      addOrder: newOrder
    })
  }
}

// export function addToBasket(card) {
//   return async (dispatch, getState) => {
//     const state = getState()
//     const { products, order } = state.goods
//     const newOrder = order + 1

//     const isCardInBasket = products.find((it) => it.id === card.id)

//     if (!isCardInBasket) {
//       const newProductObj = { ...card, count: 1, totalCurrencyPrice: card.priceCurrency }
//       const updatedProductsList = [...products, newProductObj]
//       const totalBasketSum = updatedProductsList.reduce((acc, rec) => {
//         return acc + +rec.totalCurrencyPrice
//       }, 0)
//       const totalBasketSumFixed = totalBasketSum.toFixed(2)

//       dispatch({
//         type: ADD_TO_BASKET,
//         cardTitle: card.title,
//         addProduct: updatedProductsList,
//         updatedSum: totalBasketSumFixed,
//         addOrder: newOrder
//       })
//     } else {
//       const updatedProductsList = await products.map((obj) => {
//         if (obj.id === card.id) {
//           const addCount = +obj.count + 1
//           const totalCurrenciedPrice = +obj.priceCurrency * addCount
//           const totalCurrenciedPriceFixed = totalCurrenciedPrice.toFixed(2)
//           return {
//             ...obj,
//             count: addCount,
//             totalCurrencyPrice: totalCurrenciedPriceFixed
//           }
//         }
//         return obj
//       })

//       const totalBasketSum = updatedProductsList.reduce((acc, rec) => {
//         return acc + +rec.totalCurrencyPrice
//       }, 0)
//       const totalBasketSumFixed = totalBasketSum.toFixed(2)

//       dispatch({
//         type: ADD_TO_BASKET,
//         cardTitle: card.title,
//         addProduct: updatedProductsList,
//         updatedSum: totalBasketSumFixed,
//         addOrder: newOrder
//       })
//     }
//   }
// }

// export function removeFromBusket(product) {
//   return (dispatch, getStore) => {
//     const store = getStore()
//     const { products, sum, order } = store.goods
//     const newOrder = order - 1

//     const updatedProductsArray =
//       product.count === 1
//         ? products.filter((it) => it.id !== product.id)
//         : products.map((obj) => {
//             if (obj.id === product.id) {
//               const decrease = +obj.count - 1
//               const updatedPrice = +obj.totalCurrencyPrice - +obj.priceCurrency
//               const updatedPriceFixed = updatedPrice.toFixed(2)
//               return { ...obj, count: decrease, totalCurrencyPrice: updatedPriceFixed }
//             }
//             return obj
//           })

//     const totalBasketSum = sum - +product.priceCurrency
//     const totalBasketSumFixed = totalBasketSum.toFixed(2)

//     dispatch({
//       type: REMOVE_FROM_BASKET,
//       productTitle: product.title,
//       removeProduct: updatedProductsArray,
//       updatedSum: totalBasketSumFixed,
//       decOrder: newOrder
//     })
//   }
// }

export function removeFromBusketObj(product) {
  return (dispatch, getStore) => {
    const store = getStore()
    const { products, sum, order } = store.goods
    const newOrder = +order - 1
    const totalBasketSum = +sum - +product.priceCurrency
    const totalBasketSumFixed = totalBasketSum.toFixed(2)

    if (product.count === 1) {
      const updatedProducts = products
      delete updatedProducts[product.id]
      return dispatch({
        type: REMOVE_FROM_BASKET,
        removeProduct: updatedProducts,
        updatedSum: totalBasketSumFixed,
        decOrder: newOrder
      })
    }

    const updatedProducts = {
      ...products,
      [product.id]: {
        ...product,
        count: +[product.count] - 1,
        totalCurrencyPrice: (+product.totalCurrencyPrice - +product.priceCurrency).toFixed(2)
      }
    }

    return dispatch({
      type: REMOVE_FROM_BASKET,
      removeProduct: updatedProducts,
      updatedSum: totalBasketSumFixed,
      decOrder: newOrder
    })
  }
}
