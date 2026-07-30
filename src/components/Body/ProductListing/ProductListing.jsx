import { useLocation, useParams } from 'react-router-dom'
import './ProductListing.css'
import { useState } from 'react'
import { Header } from '../../Header/Header'


export const ProductListing = () => {
  // -----------------------------------------------

  const { cateValue } = useParams()
  const location = useLocation()
  let filterData = [...location.state.productData]
  filterData = filterData.filter((item) => item.category == cateValue)
console.log('Produlisting page filterData',filterData)

  // ------------------Sort Price-----------------------------
  const [sortPriceNav, setSortPriceNav] = useState('')
  // console.log('Before -', filterData)

  if (sortPriceNav == 'LtoH') {
    filterData = [...filterData].sort((p, q) => p.price - q.price)
  }
  if (sortPriceNav == 'HtoL') {
    filterData = [...filterData].sort((p, q) => q.price - p.price)
  }





  // ------------------ Rating sort -----------------------------
  const [sort_Rating_Nav, setSort_Rating_Nav] = useState('')

  if (sort_Rating_Nav == 'LtoH') {
    filterData = [...filterData].sort((p, q) => p.rating - q.rating)
  }
  if (sort_Rating_Nav == 'HtoL') {
    filterData = [...filterData].sort((p, q) => q.rating - p.rating)
  }




  //-------------------Filter tage add & remove-----------------------------
  const [selectedFilters, setSelectedFilters] = useState([])
  const addFilter = (value) => {
    setSelectedFilters((prev) =>
      prev.includes(value) ? prev : [...prev, value],
    )
  }

  const removeFilter = (value) => {
    setSelectedFilters((prev) => prev.filter((item) => item !== value))

    // Remove corresponding filter
    if (value === subCategory) {
      setSubCategory('')
    }

    if (value === `${starRating} Star`) {
      setStarRating('')
    }

    if (value === `${discountValue}% & more`) {
      setDicountValue('')
    }

    if (value === `₹${price}`) {
      setPrice('')
    }
  }

  const clearAllFilters = () => {
    setSelectedFilters([])
    setSubCategory('')
    setPrice('')
    setStarRating('')
    setDicountValue('')
  }

  // -----------------Sub Catergory Tag------------------------------

  const [subCategory, setSubCategory] = useState('')
  const [show, setShow] = useState(false)

  if (subCategory) {
    filterData = filterData.filter((item) => item.tags.includes(subCategory))
  }

  const uniqueTags = [...new Set(filterData.flatMap((item) => item.tags))]

  // --------------Price---------------------------------
  const [price, setPrice] = useState('')

  if (price) {
    filterData = filterData.filter((item) => item.price <= price)
  }

  //---------------Rating----------------------------------------

  const [starRating, setStarRating] = useState('')
  const handelCheckBox = (e) => {
    if (e.target.checked) {
      setStarRating(Number(e.target.value))

      setSelectedFilters((prev) => [
        ...prev.filter((item) => !item.includes('Star')),
        `${e.target.value} Star`,
      ])
    } else {
      setStarRating('')
      removeFilter(`${e.target.value} Star`)
    }
  }

  if (starRating !== '') {
    filterData = filterData.filter(
      (item) => item.rating >= starRating && item.rating < starRating + 1,
    )
  }

  //----------------Discount--------------------------------
  const [discountValue, setDicountValue] = useState('')
  const handleDiscount = (e) => {
    if (e.target.checked) {
      setDicountValue(Number(e.target.value))

      setSelectedFilters((prev) => [
        ...prev.filter((item) => item.indexOf('%') === -1),
        `${e.target.value}% & more`,
      ])
    } else {
      setDicountValue('')
      removeFilter(`${e.target.value}% & more`)
    }
  }

  if (discountValue !== '') 
    {
    filterData = filterData.filter(
      (item) =>
        item.discountPercentage >= discountValue &&
        item.discountPercentage < discountValue + 4,
    )
  }
 


//------------------------------------------------------


  return (
    <>
    <Header/>
      <div className='main'>
        {/* filter section */}
        <div className="main-filter-section">
          <div className="filter-header">
            <h3>Filters</h3>

            <span className="clear-all" onClick={clearAllFilters}>
              CLEAR ALL
            </span>
          </div>

          <div className="selected-filters">
            {selectedFilters.map((item) => (
              <div className="chip" key={item}>
                <span className="cross" onClick={() => removeFilter(item)}>
                  ✕
                </span>

                {item}
              </div>
            ))}
          </div>

          <div className="category-filter-section">
            <span>Sub Category</span>
            <p onClick={() => setShow(!show)}>{show ? '▼' : '▶'} Tags</p>
            {show &&
              uniqueTags.map((item) => (
                <div>
                  <p
                    key={item.id}
                    onClick={() => {
                      setSubCategory(item)
                      addFilter(item)
                    }}
                  >
                    {item}
                  </p>
                </div>
              ))}
          </div>

          <div className="price-filter-section">
            <h3>Price Rs.{price} </h3>
            <input
              className="price-filter-range"
              type="range"
              min="1"
              max="2500"
              step="1"
              onChange={(e) => {
                setPrice(e.target.value)

                setSelectedFilters((prev) => [
                  ...prev.filter((item) => !item.startsWith('₹')),
                  `₹${e.target.value}`,
                ])
              }}
            />
          </div>

          <div className="cutom-rating">
            <h3>Customr Rating</h3>
            <input
              type="checkbox"
              value="4"
              checked={starRating == 4}
              onChange={handelCheckBox}
              name="rating"
            />{' '}
            4 star & above <br />
            <input
              type="checkbox"
              value="3"
              checked={starRating == 3}
              onChange={handelCheckBox}
              name="rating"
            />{' '}
            3 star & above <br />
            <input
              type="checkbox"
              value="2"
              checked={starRating == 2}
              onChange={handelCheckBox}
              name="rating"
            />{' '}
            2 star & above
          </div>

          <div className="discount-checkbox">
            <h3>Discount</h3>
            <input
              type="checkbox"
              value="4"
              checked={discountValue == 4}
              onChange={handleDiscount}
            />
            4% & more <br />
            <input
              type="checkbox"
              value="8"
              checked={discountValue == 8}
              onChange={handleDiscount}
            />
            8% & more <br />
            <input
              type="checkbox"
              value="12"
              checked={discountValue == 12}
              onChange={handleDiscount}
            />
            12% & more <br />
            <input
              type="checkbox"
              value="16"
              checked={discountValue == 16}
              onChange={handleDiscount}
            />
            16% & more <br />
          </div>
        </div>

        {/* product list section */}
        <div className="main-product">
          <div className="price-sort-navbar">
            <p className="price-sort-label">
              <b>Sort By:</b>{' '}
              <span onClick={() => setSortPriceNav('LtoH')}>
                Price--Low to High||
              </span>{' '}
              <span onClick={() => setSortPriceNav('HtoL')}>
                {' '}
                Price--High to Low ||
              </span>
              <span onClick={() => setSort_Rating_Nav('LtoH')}>
                Rating-Low{' '}
              </span>
              ||{' '}
              <span onClick={() => setSort_Rating_Nav('HtoL')}>
                {' '}
                Rating-High ||
              </span>
            </p>
          </div>
          {filterData.map((item) => (
            <div className="carts-product" key={item.id}>
              {<img className="imgs-product" src={item.thumbnail} />}
              <div className="list-product">
                <span className="title-product">{item.title} </span>
                <span className="desc-product" title={item.description}>
                  {item.description}{' '}
                </span>
                <span className="price-product">Rs. {item.price} </span>
                <span className="price-product">Rating- {item.rating} </span>
                <span className="price-product">
                  Disc- {item.discountPercentage}{' '}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
