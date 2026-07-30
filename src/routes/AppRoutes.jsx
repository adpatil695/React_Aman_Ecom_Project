import {  Route, Routes } from "react-router-dom"
import { Category } from "../components/Body/Category/Category"
import { ProductListing } from "../components/Body/ProductListing/ProductListing"
import { ProductDetail } from "../components/Body/ProductDetail/ProductDetail"


export const AppRoutes = () => {
  

  return (
    <>
      <Routes>
        
        <Route path="/" element={<Category />} />

        <Route path="/ProductListing/:cateValue" element={<ProductListing />} />

        <Route path="/ProductDetail/:prodDetailID" element={<ProductDetail />}/>

      </Routes>
    </>
  )
}