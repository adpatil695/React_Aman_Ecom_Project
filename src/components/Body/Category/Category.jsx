import { useEffect, useState } from "react"
import { getProducts } from "../../../services/productApi"
import './Category.css'
import { useNavigate } from "react-router-dom"
import { Header } from "../../Header/Header"
export const Category = () => 
{
  const [productData, setProductData] = useState([])

  useEffect(() => {
    const productDetailFn = async () => {
      const resp = await getProducts()
      setProductData(resp.products)
    }
    productDetailFn()
  }, [])

  const uniqueProducts = productData.filter(
    (item, index, arr) =>
      index === arr.findIndex((obj) => obj.category === item.category),
  )

  const navigate = useNavigate()

  const handleClick = (item) => {
    navigate(`/ProductListing/${item.category}`, {
      state: { productData: productData },
    })
  }

// const dis =productData.map((item) => Math.max(item.discountPercentage))
// console.log('disc',Math.min(...dis))

  return (
    <>
      <Header />

      <div className="main">
        {uniqueProducts.map((item) => (
          <div
            className="carts"
            key={item.id}
            onClick={() => handleClick(item)}
          >
            {<img className="imgs" src={item.thumbnail} />}
            <p className="cateTitel">{item.category} </p>
          </div>
        ))}
      </div>
    </>
  )
}