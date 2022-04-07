export const ADD_TO_BASKET = 'market/goods/ADD_TO_BASKET'
export const REMOVE_FROM_BASKET = 'market/goods/REMOVE_FROM_BASKET'

const initialState = {
  products: {},
  sum: (0).toFixed(2),
  order: 0
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_TO_BASKET: {
      return {
        ...state,
        products: action.updateProducts,
        sum: action.updatedSum,
        order: action.addOrder
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
    default:
      return state
  }
}

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
