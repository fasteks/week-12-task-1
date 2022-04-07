import axios from 'axios'

const GET_CARDS = 'market/cards/GET_CARDS'

const initialState = {
  cards: []
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_CARDS: {
      return {
        ...state,
        cards: action.goods
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
