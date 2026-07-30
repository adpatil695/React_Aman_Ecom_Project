import './ProductDetail.css'
import { useEffect, useState } from 'react'
import { getProducts } from '../../../services/productApi'
import { useParams } from 'react-router-dom'

export const ProductDetail = () => {
  const [productData, setProductData] = useState([])
  const { prodDetailID } = useParams()
  useEffect(() => {
    const productDetailFn = async () => {
      const resp = await getProducts()
      setProductData(resp.products)
    }
    productDetailFn()
  }, [])

  const filterDataProdDetail = productData
    .filter((item) => item.id == Number(prodDetailID))
    .slice(0, 1)

  return (
    <div>
      {filterDataProdDetail.map((item) => (
        <div className="prod-detail">
          <div>
            <img src={item.images} className="prod-img-detail" alt="No img" />
            <div>
              <button className="prod-btn-detail">Add to Card</button>
              <button className="prod-btn-detail">Buy</button>
            </div>
          </div>

          <div className="prod-para-detail">
            <h4>{item.title} </h4>
            <i> {item.description} </i>
            <h3> Super Deals </h3>
            <p>
              {' '}
              {item.discountPercentage}% Rs.{item.price}{' '}
            </p>
            <h3>Delivery details:</h3>
            <p>{item.shippingInformation} </p>
            <h3>Product Highlights</h3>
            <p>
              Height-{item.dimensions.height}cm, Width-{item.dimensions.width}
              cm ,Depth-{item.dimensions.depth}cm,Weight-{item.weight}
            </p>
            <h3>Return Policy: </h3>
            <p>{item.returnPolicy} </p>
            <h3>Review: </h3>
            <ul>
              {item.reviews.map((userSec) => (
                <div>
                  <li>* Name-{userSec.reviewerName} Email-</li>
                  <li>Rating -{userSec.rating} </li>
                  <li>{userSec.comment} </li>
                </div>
              ))}
            </ul>

            <h3>Warranty : </h3>

            <p>{item.warrantyInformation}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
