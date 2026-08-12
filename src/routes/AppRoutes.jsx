import {  BrowserRouter, Route, Routes } from "react-router-dom"
import { Category } from "../components/Body/Category/Category"
import { ProductListing } from "../components/Body/ProductListing/ProductListing"
import { ProductDetail } from "../components/Body/ProductDetail/ProductDetail"
import { Cart } from "../components/Body/Cart/Cart"


export const AppRoutes = () => {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Category />} />

          <Route
            path="/ProductListing/:cateValue"
            element={<ProductListing />}
          />

          <Route
            path="/ProductDetail/:prodDetailID"
            element={<ProductDetail />}
          />
          <Route path='/Cart' element={<Cart/>}/>
        </Routes>   

      </BrowserRouter>
    </>
  )
}