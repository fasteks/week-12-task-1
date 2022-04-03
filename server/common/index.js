// import { readFile } from 'fs/promises'

// export const getProductsFunc = () => {
//   return readFile(`${__dirname}/../data/goods.json`, 'utf-8')
//     .then((data) => JSON.parse(data))
//     .catch(() => [])
// }

export default (arrayOfProducts, by) => {
  switch (by) {
    case 'name': {
      return arrayOfProducts.sort((a, b) => {
        return a.title.localeCompare(b.title)
      })
    }
    case 'price': {
      return arrayOfProducts.sort((a, b) => {
        return b.price - a.price
      })
    }
    default:
      return arrayOfProducts
  }
}
