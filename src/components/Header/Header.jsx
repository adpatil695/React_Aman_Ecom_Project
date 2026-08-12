import './Header.css'
import { useContext, useEffect, useState } from 'react'
import { AiFillMacCommand } from 'react-icons/ai'
import { RiEBike2Fill } from 'react-icons/ri'
import { GiCommercialAirplane } from 'react-icons/gi'
import { IoHome } from 'react-icons/io5'
import { PiToggleLeftFill } from 'react-icons/pi'

import {Cart} from '../Body/Cart/Cart'

import { CiUser } from 'react-icons/ci'
import { FaAngleDown } from 'react-icons/fa'
import { CiShoppingCart } from 'react-icons/ci'
import { getProducts } from '../../services/productApi'
import { Link, useNavigate } from 'react-router-dom'
import { modeAPI } from '../../App'

export const Header = () => {
  const navigate = useNavigate()

  const handleSelect = (item) => {
    navigate(`/ProductDetail/${item.id}`)
    setSugestionData([])
  }

  const { handleModeChange, themeClass } = useContext(modeAPI)

  const [productData, setProductData] = useState([])
  const [sugestionData, setSugestionData] = useState([])

  useEffect(() => {
    const productDetailFn = async () => {
      const resp = await getProducts()
      setProductData(resp.products)
    }
    productDetailFn()
  }, [])

  //----------------------------Search  without Debounce----------------------------
  //const [searchProdValue, setSearchProdValue] = useState('')
  // const handleSearchHeading = (e) => {
  //   setSearchProdValue(e.target.value)
  //   if (searchProdValue == '') {
  //     setSugestionData([])
  //     console.log('No Data in Auto Suggetion')
  //   }
  //   setSugestionData(filterDataBySearch)
  // }

  // const filterDataBySearch = productData
  //   .filter((item) =>
  //     item.title.toLowerCase().includes(searchProdValue.toLowerCase()),
  //   )
  //   .slice(0, 8)

  //------------------------------Search with Debounce ----------------------------
  const [searchProdValue, setSearchProdValue] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const handleSearchHeading = (e) => {
    setSearchProdValue(e.target.value)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchProdValue)
      //console.log('Debounce..')
    }, 500)
    return () => {
      clearTimeout(timer)
      //console.log('cleartimer')
    }
  }, [searchProdValue])

  const filterDataBySearch = productData
    .filter((item) =>
      item.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
    )
    .slice(0, 8)

  useEffect(() => {
    if (debouncedSearch.trim() === '') {
      setSugestionData([])
      return
    }

    setSugestionData(filterDataBySearch)
  }, [debouncedSearch, productData])

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
            className={`input-search ${themeClass}`}
            placeholder={`Search for Products,Brands and More`}
            onChange={handleSearchHeading}
          />

          {sugestionData.length > 0 && (
            <ul className={`suggestion-box ${themeClass}`}>
              {filterDataBySearch.map((item) => (
                <li
                  className="sugestion-item"
                  onClick={() => handleSelect(item)}
                >
                  {' '}
                  <img
                    src={item.images}
                    className="sugestion-img"
                    alt="No Img"
                  />{' '}
                  {item.title}
                </li>
              ))}{' '}
            </ul>
          )}
        </div>

        <div className="">
          <span className="user-icon">
            <CiUser />
          </span>
          <span className="more-icon">
            More <FaAngleDown />
          </span>
          <span className="card-icon">
            <Link className="cart-link-prop" to={'/Cart'}>
              {' '}
              Card <CiShoppingCart />
              {'  '}
            </Link>
          </span>
          <span className="card-icon" onClick={handleModeChange}>
            Mode <PiToggleLeftFill />
          </span>
        </div>
      </div>
    </div>
  )
}
