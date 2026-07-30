import './Header.css'
import {useEffect, useState} from 'react'
import { AiFillMacCommand } from "react-icons/ai";
import { RiEBike2Fill } from 'react-icons/ri'
import { GiCommercialAirplane } from 'react-icons/gi'
import { IoHome } from 'react-icons/io5'


import { CiUser } from 'react-icons/ci'
import { FaAngleDown } from 'react-icons/fa'
import { CiShoppingCart } from 'react-icons/ci' 
import { getProducts } from '../../services/productApi';
import { useNavigate } from 'react-router-dom';


export const Header = () => {
     const navigate = useNavigate()

     const handleSelect = (item) => {
       navigate(`/ProductDetail/${item.id}`)
       setSugestionData([])
     }
   
     
    
  const[searchProdValue,setSearchProdValue]=useState('')
    const [productData, setProductData] = useState([])
      const [sugestionData, setSugestionData] = useState([])
   
  
    useEffect(() => {
      const productDetailFn = async () => {
        const resp = await getProducts()
        setProductData(resp.products)
      }
      productDetailFn()
    }, [])

    const filterDataBySearch = productData
      .filter((item) =>
        item.title.toLowerCase().includes(searchProdValue.toLowerCase()),
      ).slice(0, 8)

   
    
    const handleSearchHeading=(e)=>
    {
       setSearchProdValue(e.target.value)
      if(searchProdValue=='')
      {
        setSugestionData([])
       
      }
       setSugestionData(filterDataBySearch)

    }

 
    

  return (
    <div className="header">
      <div className="header-1">
        <div className="header-1-left-logo">
          <AiFillMacCommand className="logo" />

          <RiEBike2Fill className="logo" />

          <GiCommercialAirplane className="logo" />
        </div>

        <div>
          <IoHome className="logo-home" /> <b>HOME </b>
        </div>
      </div>
      <div className="header-2">
        <div>
          <input
            type="text"
            className="input-search"
            placeholder={`Search for Products,Brands and More`}
            onChange={handleSearchHeading}
          />

          <ul className="suggestion-box">
            { 
              sugestionData.length > 0 &&
              filterDataBySearch.map((item) => (
                <li className="sugestion-item" onClick={()=>handleSelect(item)} >
                  {' '}
                  <img
                    src={item.images}
                    className="sugestion-img"
                    alt="No Img"
                  />{' '}
                  {item.title}
                </li>
              ))}
          </ul>
        </div>

        <div className="">
          <span className="user-icon">
            <CiUser />
          </span>
          <span className="more-icon">
            More <FaAngleDown />
          </span>
          <span className="card-icon">
            Card <CiShoppingCart />
          </span>
        </div>
      </div>
    </div>
  )
}

