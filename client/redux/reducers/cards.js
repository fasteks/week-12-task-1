import axios from 'axios'

export const SORT_CARDS = 'market/settings/SORT_CARDS'
export const UPDATE_CARDS = 'market/cards/UPDATE_CARDS'

const initialState = {
  cards: []
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_CARDS: {
      return {
        ...state,
        cards: action.payload
      }
    }
    case SORT_CARDS: {
      return {
        ...state,
        cards: action.payload
      }
    }
    default:
      return state
  }
}

export function getCards() {
  return async (dispatch, useStore) => {
    const store = useStore()
    const { rates, currency } = store.settings
    await axios('/api/v1/goods')
      .then(({ data }) => {
        const cards = data
        const cardsArray = cards.map((it) => {
          const currenciedPrice = +it.price * +rates[currency]
          const currenciedPriceFixed = currenciedPrice.toFixed(2)
          return { ...it, priceCurrency: currenciedPriceFixed }
        })
        dispatch({ type: UPDATE_CARDS, payload: cardsArray })
      })
      .catch((error) => error)
  }
}

export function sortCardsServer(by) {
  return async (dispatch, useState) => {
    const { rates, currency } = useState().settings
    const { cards } = useState().cards
    await axios({
      method: 'post',
      url: 'api/v1/sort',
      data: {
        obj: cards,
        by
      }
    })
      .then(({ data }) => data)
      .then((sortedArray) => {
        const cardsArray = sortedArray.map((it) => {
          const currenciedPrice = +it.price * +rates[currency]
          const currenciedPriceFixed = currenciedPrice.toFixed(2)
          return { ...it, priceCurrency: currenciedPriceFixed }
        })
        dispatch({ type: SORT_CARDS, payload: cardsArray, sort: by })
      })
  }
}

// export function sortByServer(obj, by) {
//   return async (dispatch, getStore) => {
//     await axios({
//       method: 'post',
//       url: 'api/v1/sortByServer',
//       data: {
//         obj,
//         by
//       }
//     })
//       .then(({ data }) => data)
//       .then((sortedArray) => {
//         if (obj === SORT_CARDS) {
//           const { rates, currency } = getStore().settings
//           const cardsArray = sortedArray.map((it) => {
//             const currenciedPrice = +it.price * +rates[currency]
//             const currenciedPriceFixed = currenciedPrice.toFixed(2)
//             return { ...it, priceCurrency: currenciedPriceFixed }
//           })
//           return dispatch({ type: SORT_CARDS, payload: cardsArray, sort: by })
//         }

//         return dispatch({ type: obj, sortedGoods: sortedArray, sort: by })
//       })
//       .catch((error) => error)
//   }
// }
