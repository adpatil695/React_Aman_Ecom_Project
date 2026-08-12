
import './Cart.css'
import { useDispatch, useSelector } from "react-redux"
import {Header} from '../../Header/Header'
import { removeCartItem } from '../../../redux toolkit/cartSlice'

export const Cart = () => {
    const dispatch=useDispatch()
   
  const cartItemData = useSelector((state) => state.cartData.cartItem)
    const totalPrice = cartItemData.reduce((sum,item)=>{return sum+item.price},0).toFixed(2)
    const totalDiscount = cartItemData.reduce((sum,item)=>{return sum + item.discountPercentage},0).toFixed(2)

    console.log('totalPrice', totalPrice)
    
    
    console.log('Cart page Data', cartItemData)
  return (
    <>
      <Header />

      <div className="main">
        {/* LEFT SIDE */}
        <div className="main-div-left">
          {cartItemData.map((item) => (
            <div className="box-1" key={item.id}>
              <div className="box-img-1">
                <img
                  className="img-left"
                  src={item.images[0]}
                  alt="error in img"
                />

                <div>
                  <p>{item.title}</p>
                  <span>⭐⭐⭐⭐ {item.rating}</span>
                </div>
              </div>

              <div className="box-img-2">
                <select>
                  {Array.from({ length: item.stock }, (_, index) => (
                    <option key={index + 1}>{index + 1}</option>
                  ))}
                </select>

                <p>
                  Disc Per. {item.discountPercentage}% Rs.{item.price}
                </p>

                <button onClick={() => dispatch(removeCartItem(item.id))}>
                  Remove
                </button>
                <button>Buy Now</button>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE */}
       {cartItemData.length > 0 && <div className="main-div-right">
          <p>MRP(incl. of all taxes)- Rs.{totalPrice} </p>
          <p>Total Disc-{totalDiscount}% </p>
          <p>
            <button>Place Order</button>{' '}
          </p>
        </div>}
      </div>
    </>
  )
}