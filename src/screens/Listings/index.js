import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { Link, useNavigate, useLocation } from 'react-router-dom'

// functions
import { 
  getListings,
} from "../../actions"

// css
import styles from "./listings.module.css"

const Listings = () => {
  const dispatch = useDispatch()

  // global state
  const {
    listings
  } =  useSelector(state => state.listingStore)
  
  useEffect(() => {
    dispatch(getListings())
  }, [dispatch])

  return (
    <div className={`${styles.listings}`}>
      
    </div>
  )
}

export default Listings
