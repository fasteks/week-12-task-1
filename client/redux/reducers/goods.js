import axios from 'axios'

const GET_CARDS = 'market/goods/GET_CARDS'
const ADD_TO_BUSKET = 'market/goods/ADD_TO_BUSKET'
const REMOVE_FROM_BUSKET = 'market/goods/REMOVE_FROM_BUSKET'
const GET_RATES = 'market/goods/GET_RATES'
const CHANGE_CURRENCY = 'market/goods/CHANGE_CURRENCY'
const USD_CURRENCY = 'USD'
const EUR_CURRENCY = 'EUR'
const CAD_CURRENCY = 'CAD'

const initialState = {
  cards: [],
  products: [],
  sum: {
    [USD_CURRENCY]: 0,
    [EUR_CURRENCY]: 0,
    [CAD_CURRENCY]: 0
  },
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
        rates: action.getRate
      }
    }
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
        sum: action.updatedSum,
        order: action.addOrder
      }
    }
    case CHANGE_CURRENCY: {
      return {
        ...state,
        currency: action.curren,
        sum: action.currencySum
      }
    }
    case REMOVE_FROM_BUSKET: {
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

export function getCards() {
  return async (dispatch, useStore) => {
    const store = useStore()
    const { rates } = store.goods
    await axios('/api/v1/goods').then(({ data }) => {
      const cards = data
      const setPrice = () => {
        const cardsArray = cards.map((it) => {
          const usdPrice = +it.price * rates[USD_CURRENCY]
          const eurPrice = +it.price * rates[EUR_CURRENCY]
          const cadPrice = +it.price * rates[CAD_CURRENCY]
          const usdPriceFixed = usdPrice.toFixed(2)
          const eurPriceFixed = eurPrice.toFixed(2)
          const cadPriceFixed = cadPrice.toFixed(2)
          const cardPriceObj = {
            [USD_CURRENCY]: usdPriceFixed,
            [EUR_CURRENCY]: eurPriceFixed,
            [CAD_CURRENCY]: cadPriceFixed
          }
          return {
            ...it,
            price: cardPriceObj,
            count: 0
          }
        })
        return cardsArray
      }

      dispatch({ type: GET_CARDS, goods: setPrice() })
    })
  }
}

export function addToBasket(card) {
  return (dispatch, getState) => {
    const state = getState()
    const { cards, products, rates, order } = state.goods
    const newOrder = order + 1
    const lookForCard = () => {
      const isCardInBasket = products.find((it) => it.id === card.id)

      if (!isCardInBasket) {
        const neededCard = cards.find((it) => it.id === card.id)
        const totalPriceUSD = card.price[USD_CURRENCY] * +rates[USD_CURRENCY]
        const totalPriceEUR = card.price[USD_CURRENCY] * +rates[EUR_CURRENCY]
        const totalPriceCAD = card.price[USD_CURRENCY] * +rates[CAD_CURRENCY]
        const totalPriceUSDFixed = totalPriceUSD.toFixed(2)
        const totalPriceEURFixed = totalPriceEUR.toFixed(2)
        const totalPriceCADFixed = totalPriceCAD.toFixed(2)
        const totalPrice = {
          [USD_CURRENCY]: totalPriceUSDFixed,
          [EUR_CURRENCY]: totalPriceEURFixed,
          [CAD_CURRENCY]: totalPriceCADFixed
        }
        // const totalPrice = {
        //   [USD_CURRENCY]: totalPriceUSD,
        //   [EUR_CURRENCY]: totalPriceEUR,
        //   [CAD_CURRENCY]: totalPriceCAD
        // }
        const newProductObj = { ...neededCard, count: 1, totalPriceForProducts: totalPrice }
        return [...products, newProductObj]
      }

      const updatedProductsList = products.map((obj) => {
        if (obj.id === card.id) {
          const addCount = +obj.count + 1
          const totalPriceUSD = card.price[USD_CURRENCY] * +rates[USD_CURRENCY] * addCount
          const totalPriceEUR = card.price[USD_CURRENCY] * +rates[EUR_CURRENCY] * addCount
          const totalPriceCAD = card.price[USD_CURRENCY] * +rates[CAD_CURRENCY] * addCount
          // const totalPrice = {
          //   [USD_CURRENCY]: totalPriceUSD,
          //   [EUR_CURRENCY]: totalPriceEUR,
          //   [CAD_CURRENCY]: totalPriceCAD
          // }
          const totalPriceUSDFixed = totalPriceUSD.toFixed(2)
          const totalPriceEURFixed = totalPriceEUR.toFixed(2)
          const totalPriceCADFixed = totalPriceCAD.toFixed(2)
          const totalPrice = {
            [USD_CURRENCY]: totalPriceUSDFixed,
            [EUR_CURRENCY]: totalPriceEURFixed,
            [CAD_CURRENCY]: totalPriceCADFixed
          }
          const addingOneMoreProduct = {
            ...obj,
            count: addCount,
            totalPriceForProducts: totalPrice
          }
          return addingOneMoreProduct
        }
        return obj
      })
      return updatedProductsList
    }

    const calcSum = () => {
      const newArray = [...products, card]
      const calcTotalSum = newArray.map((it) => {
        const totalPriceUSD = card.price[USD_CURRENCY] * +rates[USD_CURRENCY] * it.count
        const totalPriceEUR = card.price[USD_CURRENCY] * +rates[EUR_CURRENCY] * it.count
        const totalPriceCAD = card.price[USD_CURRENCY] * +rates[CAD_CURRENCY] * it.count
        // const totalPriceUSD = it.price[USD_CURRENCY] * it.count
        // const totalPriceEUR = it.price[EUR_CURRENCY] * it.count
        // const totalPriceCAD = it.price[CAD_CURRENCY] * it.count
        const totalPriceUSDFixed = totalPriceUSD.toFixed(2)
        const totalPriceEURFixed = totalPriceEUR.toFixed(2)
        const totalPriceCADFixed = totalPriceCAD.toFixed(2)
        return {
          [USD_CURRENCY]: totalPriceUSDFixed,
          [EUR_CURRENCY]: totalPriceEURFixed,
          [CAD_CURRENCY]: totalPriceCADFixed
        }
        // return {
        //   [USD_CURRENCY]: totalPriceUSD,
        //   [EUR_CURRENCY]: totalPriceEUR,
        //   [CAD_CURRENCY]: totalPriceCAD
        // }
      })
      const totalSumUsd = calcTotalSum.reduce((acc, rec) => {
        return acc + +rec[USD_CURRENCY]
      }, +card.price[USD_CURRENCY])
      const totalSumEur = calcTotalSum.reduce((acc, rec) => {
        return acc + +rec[EUR_CURRENCY]
      }, +card.price[EUR_CURRENCY])
      const totalSumCad = calcTotalSum.reduce((acc, rec) => {
        return acc + +rec[CAD_CURRENCY]
      }, +card.price[CAD_CURRENCY])
      const totalSumUsdFixed = totalSumUsd.toFixed(2)
      const totalSumEurFixed = totalSumEur.toFixed(2)
      const totalSumCadFixed = totalSumCad.toFixed(2)
      return {
        [USD_CURRENCY]: totalSumUsdFixed,
        [EUR_CURRENCY]: totalSumEurFixed,
        [CAD_CURRENCY]: totalSumCadFixed
      }
      // return {
      //   [USD_CURRENCY]: +totalSumUsd,
      //   [EUR_CURRENCY]: +totalSumEur,
      //   [CAD_CURRENCY]: +totalSumCad
      // }
    }

    dispatch({
      type: ADD_TO_BUSKET,
      addProduct: lookForCard(),
      updatedSum: calcSum(),
      addOrder: newOrder
    })
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
              const newTotalPriceUSD =
                +obj.totalPriceForProducts[USD_CURRENCY] - product.price[USD_CURRENCY]
              const newTotalPriceEUR =
                +obj.totalPriceForProducts[EUR_CURRENCY] - product.price[EUR_CURRENCY]
              const newTotalPriceCAD =
                +obj.totalPriceForProducts[CAD_CURRENCY] - product.price[CAD_CURRENCY]
              const newTotalPriceUSDFixed = newTotalPriceUSD.toFixed(2)
              const newTotalPriceEURFixed = newTotalPriceEUR.toFixed(2)
              const newTotalPriceCADFixed = newTotalPriceCAD.toFixed(2)
              const newTotalPriceObj = {
                [USD_CURRENCY]: newTotalPriceUSDFixed,
                [EUR_CURRENCY]: newTotalPriceEURFixed,
                [CAD_CURRENCY]: newTotalPriceCADFixed
              }
              return { ...obj, count: decrease, totalPriceForProducts: newTotalPriceObj }
            }
            return obj
          })

    const calcSum = () => {
      const newSumUSD = sum[USD_CURRENCY] - product.price[USD_CURRENCY]
      const newSumEUR = sum[EUR_CURRENCY] - product.price[EUR_CURRENCY]
      const newSumCAD = sum[CAD_CURRENCY] - product.price[CAD_CURRENCY]
      const newSumUSDFixed = newSumUSD.toFixed(2)
      const newSumEURFixed = newSumEUR.toFixed(2)
      const newSumCADFixed = newSumCAD.toFixed(2)
      const newSum = {
        [USD_CURRENCY]: newSumUSDFixed,
        [EUR_CURRENCY]: newSumEURFixed,
        [CAD_CURRENCY]: newSumCADFixed
      }
      return newSum
    }
    dispatch({
      type: REMOVE_FROM_BUSKET,
      removeProduct: updatedProductsArray,
      decOrder: newOrder,
      updatedSum: calcSum()
    })
  }
}

export function getRates() {
  return async (dispatch) => {
    await axios('/api/v1/rates').then(({ data }) => {
      dispatch({ type: GET_RATES, getRate: data })
    })
  }
}

export function changeCurrency(curr) {
  return (dispatch, getState) => {
    const state = getState()
    const { products } = state.goods

    const calcSum = () => {
      const calcTotalSum = products.map((it) => {
        const totalPriceUSD = it.price[USD_CURRENCY] * it.count
        const totalPriceEUR = it.price[EUR_CURRENCY] * it.count
        const totalPriceCAD = it.price[CAD_CURRENCY] * it.count
        return {
          [USD_CURRENCY]: totalPriceUSD,
          [EUR_CURRENCY]: totalPriceEUR,
          [CAD_CURRENCY]: totalPriceCAD
        }
      })
      //   const totalPriceUSDFixed = totalPriceUSD.toFixed(2)
      //   const totalPriceEURFixed = totalPriceEUR.toFixed(2)
      //   const totalPriceCADFixed = totalPriceCAD.toFixed(2)
      //   return {
      //     [USD_CURRENCY]: totalPriceUSDFixed,
      //     [EUR_CURRENCY]: totalPriceEURFixed,
      //     [CAD_CURRENCY]: totalPriceCADFixed
      //   }
      // })
      const totalSumUsd = calcTotalSum.reduce((acc, rec) => {
        return acc + +rec[USD_CURRENCY]
      }, 0)
      const totalSumEur = calcTotalSum.reduce((acc, rec) => {
        return acc + +rec[EUR_CURRENCY]
      }, 0)
      const totalSumCad = calcTotalSum.reduce((acc, rec) => {
        return acc + +rec[CAD_CURRENCY]
      }, 0)
      const totalSumUsdFixed = totalSumUsd.toFixed(2)
      const totalSumEurFixed = totalSumEur.toFixed(2)
      const totalSumCadFixed = totalSumCad.toFixed(2)
      return {
        [USD_CURRENCY]: totalSumUsdFixed,
        [EUR_CURRENCY]: totalSumEurFixed,
        [CAD_CURRENCY]: totalSumCadFixed
      }
    }
    dispatch({
      type: CHANGE_CURRENCY,
      currencySum: calcSum(),
      curren: curr
    })
  }
}
