import { useState, useEffect, useRef } from 'react'

import Draggable from "react-draggable"
import Form from "../Form"
import Naira from "../Naira"

import {
  numberArray,
} from "../../utils"

// Styles
import styles from "./filterlistings.module.css"


const FilterListings = props => {
  
  const {
    setListingState,
    listings,
  } = props

  const leftCircleRef = useRef(null)
  const priceRangeBarRef = useRef(null)
  const rightCircleRef = useRef(null)
  const innerPriceRangeRef = useRef(null)
  
  const defaultMinPrice=  1000
  const defaultMMaxPrice=  200000

  const initialFormState = {
    category: "Apartment",
    rentalPeriod: "Any",
    priceRange: {min: defaultMinPrice, max: defaultMMaxPrice},
    numberOfRooms: {min: "", max: ""},
    numberOfBathrooms: {min: "", max: ""},
  }
  const getScreenWidth = () => {
    return window.innerWidth
  }


  const [form, setForm] = useState(initialFormState)
  const [priceRangeBar, setPriceRangeBar] = useState({
    rightCirclePosition: 0,
    leftCirclePosition: 0,
    innerWidth: 0,
    outerWidth: 0,
    circleWidth: 0,
  })
  const [screenWidth, setScreenWidth] = useState(getScreenWidth())

  useEffect(() => {
    const updateWidth = () => {
      setScreenWidth(getScreenWidth())
    }

    window.addEventListener("resize", updateWidth)
    return () => {
      window.removeEventListener("resize", updateWidth)
    };
  }, [screenWidth])

  useEffect(() => {
    if(form.numberOfRooms.min > form.numberOfRooms.max){
      setForm( prevForm => {
        return {
          ...prevForm,
          numberOfRooms: {min: form.numberOfRooms.min, max: form.numberOfRooms.min},
        }
      })
    }
  }, [form.numberOfRooms])

  useEffect(() => {
    if(form.numberOfBathrooms.min > form.numberOfBathrooms.max){
      setForm(prevForm => {
        return {
          ...prevForm,
          numberOfBathrooms: {min: form.numberOfBathrooms.min, max: form.numberOfBathrooms.min},
        }
      })
    }
  }, [form.numberOfBathrooms])

  useEffect(() => {
    const outerWidth = priceRangeBarRef.current.getBoundingClientRect().width
    const circleWidth = leftCircleRef.current.getBoundingClientRect().width
    setPriceRangeBar(prevData => {
      return {
        ...prevData,
        innerWidth: outerWidth - (prevData.leftCirclePosition + prevData.rightCirclePosition),
        outerWidth: outerWidth,
        circleWidth,
      }
    })
  }, [screenWidth])

  const handleSubmit = e => {
    e.preventDefault()
    console.log(form)
    const categorySearchState = listings
      .filter(listing => listing.category === form.category)

    const rentalPeriodSearchState = categorySearchState
      .filter(listing => listing.rentalPeriod === form.rentalPeriod)

    const priceRangeSearchState = rentalPeriodSearchState
    .filter(listing => (listing.price >= Number(form.priceRange.min)) && (listing.price <= Number(form.priceRange.max)))
   
    const numberOfRoomsSearchState = priceRangeSearchState
    .filter(listing => (listing.numberOfRooms >= Number(form.numberOfRooms.min || 0)) && (listing.numberOfRooms <=  Number(form.numberOfRooms.max || 0)))
    
    const numberOfBathroomsSearchState = numberOfRoomsSearchState
      .filter(listing => listing.numberOfBathrooms >= Number(form.numberOfBathrooms.min || 0) && listing.numberOfBathrooms <= Number(form.numberOfBathrooms.max || 0))

    setListingState(numberOfBathroomsSearchState)
  }

  const handleCategoryCheck = e => {
    const {name} = e.target
    setForm({...form, category: name})
 }

 const handleRentalPeriodCheck = e => {
  const {name} = e.target
  setForm({...form, rentalPeriod: name})
}

 const handleRoomChange = e => {
  const {name,value} = e.target
  setForm({...form, numberOfRooms: {...form.numberOfRooms, [name]: value}})
}

const handleBathroomChange = e => {
  const {name,value} = e.target
  setForm({...form, numberOfBathrooms: {...form.numberOfBathrooms, [name]: value}})
}

  const handlePriceRangeChange = (leftWidth, rightWidth) => {
    const outerWidth = priceRangeBarRef.current.getBoundingClientRect().width
    const circleWidth = leftCircleRef.current.getBoundingClientRect().width
    const innerPriceRangeRefWidth = innerPriceRangeRef.current.getBoundingClientRect().width
    const innerPriceRangeRefPosition = innerPriceRangeRef.current.getBoundingClientRect().x
    const fullBarRefPosition = priceRangeBarRef.current.getBoundingClientRect().x
    
    const innerWidth = outerWidth - (leftWidth + rightWidth)

    const leftRefWidth = innerPriceRangeRefPosition - fullBarRefPosition
    const rightReftWidth = outerWidth - ((innerPriceRangeRefPosition - fullBarRefPosition) + innerPriceRangeRefWidth)
    const minPrice = Math.round(((((defaultMMaxPrice - defaultMinPrice) / outerWidth) * leftRefWidth) + 1000) / 1000) * 1000
    const maxPrice = Math.round(((((defaultMMaxPrice - defaultMinPrice) / outerWidth) * (outerWidth - rightReftWidth)) + 1000) / 1000) * 1000

    return { outerWidth, circleWidth, innerWidth, minPrice, maxPrice }
  }

  const handleLeftDrag = (e, data) => {
    const { outerWidth, circleWidth, innerWidth, minPrice, maxPrice } = handlePriceRangeChange(data.x, priceRangeBar.rightCirclePosition)
    setPriceRangeBar({
      ...priceRangeBar,
      leftCirclePosition: data.x,
      innerWidth,
      outerWidth,
      circleWidth,
    })
    setForm({
      ...form,
      priceRange: {min: minPrice, max: maxPrice},
    })
  }
  const handleRightDrag = (e, data) => {
    const { outerWidth, circleWidth, innerWidth, minPrice, maxPrice } = handlePriceRangeChange(priceRangeBar.leftCirclePosition, Math.abs(data.x))
    setPriceRangeBar({
      ...priceRangeBar,
      rightCirclePosition: Math.abs(data.x),
      innerWidth,
      outerWidth,
      circleWidth,
    })
    setForm({
      ...form,
      priceRange: {min: minPrice, max: maxPrice},
    })
  }

  return (
    <div className={`${styles.filterlistings}`}>
       <form onSubmit={handleSubmit}>
          <div className="spacing-md">
            <h2 className="spacing-xs">Category</h2>
            <div>
              <Form.CheckBox 
                label="Apartment"
                onChange={handleCategoryCheck}
                checked={form.category === "Apartment"}
                name="Apartment"
              />
            </div>
            <div>
              <Form.CheckBox 
                label="Shop"
                onChange={handleCategoryCheck}
                checked={form.category === "Shop"}
                name="Shop"
              />
            </div>
          </div>

          <div className="spacing-md">
            <h2 className="spacing-xs">Price Range</h2>
            <p className="spacing-xs"> <Naira /> {Number(form.priceRange.min)} - <Naira /> {form.priceRange.max}</p>
            <div className={`${styles.price_range_bar_container}`}>
              <div ref={priceRangeBarRef} className={`${styles.price_range_bar}`}>
                <div className={`${styles.price_range_bar_outer}`}>
                  <div 
                    className={`${styles.price_range_bar_inner}`}
                    style={{
                      left: priceRangeBar.leftCirclePosition, 
                      width: priceRangeBar.innerWidth,
                    }}
                    ref={innerPriceRangeRef}
                  ></div>
                </div>
              </div>
              <Draggable
                axis="x"
                onDrag={handleLeftDrag}
                nodeRef={leftCircleRef}
                bounds={{left: 0, right: (priceRangeBar.outerWidth - priceRangeBar.rightCirclePosition) - (2 * priceRangeBar.circleWidth),}}
              >
                <div 
                  className={`${styles.price_range_circle_outer}`}
                  ref={leftCircleRef}
                >
                  <div className={`${styles.price_range_circle_inner}`} ></div>
                </div>
              </Draggable>
              <Draggable
                 axis="x"
                 onDrag={handleRightDrag}
                 nodeRef={rightCircleRef}
                 bounds={{right: 0, left: (2 * priceRangeBar.circleWidth) - (priceRangeBar.outerWidth- priceRangeBar.leftCirclePosition)}}
              >
                <div 
                  className={`${styles.price_range_circle_outer}`}
                  ref={rightCircleRef}
                >
                    <div className={`${styles.price_range_circle_inner}`}></div>
                </div>
              </Draggable>
              
            </div>

          </div>

          <div className="spacing-md">
            <h2 className="spacing-xs">Rooms</h2>
            <label>Rooms excluding bathroom</label>
            <div className={`${styles.form_column}`}>
              <Form.Dropdown
                  value={form.numberOfRooms.min}
                  onChange={handleRoomChange}
                  name={"min"}
                  placeholder={"Min"}
                  type="number"
              >
                <option value={""} disabled>{"min"}</option>
                {numberArray(1,15).length > 1 && numberArray(1,15).map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </Form.Dropdown>
              <Form.Dropdown
                value={form.numberOfRooms.max}
                onChange={handleRoomChange}
                name={"max"}
                placeholder={"Max"}
                type="number"
              >
                <option value={""} disabled>{"max"}</option>
                {numberArray(1,15).length > 1 && numberArray(1,15).map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </Form.Dropdown>
            </div>

            <div className="spacing-sm"> </div>

            <label>Bathrooms</label>
            <div className={`${styles.form_column}`}>
              <Form.Dropdown
                  value={form.numberOfBathrooms.min}
                  onChange={handleBathroomChange}
                  name={"min"}
                  placeholder={"Min"}
                  type="number"
              >
                <option value={""} disabled>{"min"}</option>
                {numberArray(1,15).length > 1 && numberArray(1,15).map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </Form.Dropdown>
              <Form.Dropdown
                value={form.numberOfBathrooms.max}
                onChange={handleBathroomChange}
                name={"max"}
                placeholder={"Max"}
                type="number"
              >
                <option value={""} disabled>{"max"}</option>
                {numberArray(1,15).length > 1 && numberArray(1,15).map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </Form.Dropdown>
            </div>
          </div>
          <div className="spacing-md">
            <h2 className="spacing-xs">Rental Period</h2>
            <div>
              <Form.CheckBox
                label="Any"
                onChange={handleRentalPeriodCheck}
                checked={form.rentalPeriod === "Any"}
                name="Any"
              />
            </div>
            <div>
              <Form.CheckBox 
                label="1-12 months"
                onChange={handleRentalPeriodCheck}
                checked={form.rentalPeriod === "1-12 months"}
                name="1-12 months"
              />
            </div>
            <div>
              <Form.CheckBox 
                label="13-24 months"
                onChange={handleRentalPeriodCheck}
                checked={form.rentalPeriod === "13-24 months"}
                name="13-24 months"
              />
            </div>
            <div>
              <Form.CheckBox 
                label="24+ months"
                onChange={handleRentalPeriodCheck}
                checked={form.rentalPeriod === "24+ months"}
                name="24+ months"
              />
            </div>
          </div>
          <Form.Button>
            Apply Filter
          </Form.Button>
       </form>
    </div>
  )
}

export default FilterListings