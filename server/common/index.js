export const SORT_BY_NAME = 'name'
export const SORT_BY_PRICE = 'price'

export default (obj, by) => {
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
