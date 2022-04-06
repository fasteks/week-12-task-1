export const SORT_BY_NAME = 'name'
export const SORT_BY_PRICE = 'price'

export default (arrayOfProducts, by) => {
  switch (by) {
    case SORT_BY_NAME: {
      return arrayOfProducts.sort((a, b) => {
        return a.title.localeCompare(b.title)
      })
    }
    case SORT_BY_PRICE: {
      return arrayOfProducts.sort((a, b) => {
        return b.price - a.price
      })
    }
    default:
      return arrayOfProducts
  }
}
