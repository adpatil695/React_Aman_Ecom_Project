import axios from 'axios'
export const getProducts = async () => {
  // const response = await axios.get('https://dummyjson.com/products')

  const response = await axios.get('https://dummyjson.com/products?limit=200&skip=0')
 return response.data
}
