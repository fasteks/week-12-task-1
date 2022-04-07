import { SORT_CARDS } from '../../client/redux/reducers/goods'

export const SORT_BY_NAME = 'name'
export const SORT_BY_PRICE = 'price'

export function sortDataArray(obj, by) {
  switch (by) {
    case SORT_BY_NAME: {
      if (typeof obj.length === 'undefined') {
        const arr = Object.keys(obj).sort((a, b) => {
          return obj[a].title.localeCompare(obj[b].title)
        })
        const newObj = arr.reduce((acc, rec) => {
          return { ...acc, [rec]: obj[rec] }
        }, {})
        return newObj
      }
      return obj.sort((a, b) => {
        return a.title.localeCompare(b.title)
      })
    }
    case SORT_BY_PRICE: {
      if (typeof obj.length === 'undefined') {
        const arr = Object.keys(obj).sort((a, b) => {
          return obj[b].price - obj[a].price
        })
        const newObj = arr.reduce((acc, rec) => {
          return { ...acc, [rec]: obj[rec] }
        }, {})
        return newObj
      }
      return obj.sort((a, b) => {
        return b.price - a.price
      })
    }
    default:
      return obj
  }
}

export function sortGoodsByServer(goods, obj, by) {
  switch (by) {
    case SORT_BY_NAME: {
      if (obj !== SORT_CARDS) {
        const arr = Object.keys(goods).sort((a, b) => {
          return goods[a].title.localeCompare(goods[b].title)
        })
        const newObj = arr.reduce((acc, rec) => {
          return { ...acc, [rec]: goods[rec] }
        }, {})
        return newObj
      }
      return goods.sort((a, b) => {
        return a.title.localeCompare(b.title)
      })
    }
    case SORT_BY_PRICE: {
      if (obj !== SORT_CARDS) {
        const arr = Object.keys(goods).sort((a, b) => {
          return goods[b].price - goods[a].price
        })
        const newObj = arr.reduce((acc, rec) => {
          return { ...acc, [rec]: goods[rec] }
        }, {})
        return newObj
      }
      return goods.sort((a, b) => {
        return b.price - a.price
      })
    }
    default:
      return obj
  }
}
