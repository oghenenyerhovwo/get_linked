import { useState, useEffect } from 'react'
import { AnimatePresence, useAnimation, motion } from "framer-motion"
import moment from 'moment'
import {ImLocation} from "react-icons/im"
import {AiFillHeart, AiOutlineHeart,} from "react-icons/ai"
import {FaBath, FaAngleDoubleRight} from "react-icons/fa"
import {BsHouse} from "react-icons/bs"
import Naira from "../Naira"
import { Link } from 'react-router-dom'

// images
import { noImagePic } from "../../assets/"

import styles from "./listing.module.css"

const opacityVariant = {
  hidden: {
    opacity: 0,
    transition: {duration: 0.4, ease: "easeInOut"},
  },
  visible: {
    opacity: 1,
    transition: {duration: 0.4, ease: "easeInOut"},
  },
}

const Listing = props => {
  const { 
    listing, 
    currentUser,
    handleAddInterestListing,
    handleRemoveInterestListing,
    setShowListingState,
    userInterestedListings, 
    setUserInterestedListings,
  } = props

  const buttonAnimation = useAnimation()
  
  const [displayButton, setDisplayButton] = useState(false)
  const [interested, setInterested] = useState([])
  const [listingImage, setListingImage] = useState(listing.mainImage)

  useEffect(() => {
    if(navigator.maxTouchPoints >= 1){
      if(displayButton){
        buttonAnimation.start({
          bottom: "0.5rem",
          opacity: 1,
          transition: { duration: 0.2, },
        })
      } else {
        buttonAnimation.start({
          bottom: "-0.5rem",
          opacity: 0,
          transition: { duration: 0.2, },
        })
      }
    }
  }, [displayButton, buttonAnimation])

  useEffect(() => {
    if(listing.interests && listing.interests.includes(currentUser._id)){
      setUserInterestedListings(prevData => [...prevData, listing._id])
    } else {
      setUserInterestedListings(prevData => prevData.filter(listId => listId !== listing._id))
    }
  }, [currentUser._id, listing.interests])

  useEffect(() => {
    if(userInterestedListings.includes(listing._id)){
      setInterested(true)
    } else {
      setInterested(false)
    }
  }, [userInterestedListings, listing._id])

  const toggleDisplayButton = () => setDisplayButton(prevToggle => !prevToggle)

  const openShowListing = () => setShowListingState({display: true, _id: listing._id})

  const handleAddInterestListingChange = () => {
    handleAddInterestListing()
    setUserInterestedListings(prevData => [...prevData, listing._id])
    setDisplayButton(true)
  }

  const handleRemoveInterestListingChange = () => {
    handleRemoveInterestListing()
    setUserInterestedListings(prevData => prevData.filter(listId => listId !== listing._id))
    setDisplayButton(true)
  }

  const replaceImage = () => setListingImage(noImagePic)

  return (
        <div className={`${styles.listing} spacing-md`}>
          <div onClick={toggleDisplayButton} className={`${styles.listing_section_one}`}>
            <div className={`${styles.listing_section_one_img}`}>
              <img 
                src={listingImage} 
                alt="lsting_img" 
                onError={replaceImage}
              />
            </div>
            <div className={`${styles.listing_section_one_info_tab_container}`}>
              <div className={`${styles.listing_section_one_info_tab}`}>
                <p>{listing.category} </p>
              </div>
              {
                moment(listing.availabilityDate).isAfter(moment()) && (
                  <div className={`${styles.listing_section_one_info_tab_unavailable} ${styles.listing_section_one_info_tab}`}>
                    <p>AVAILABLE</p>
                    <p>{moment(listing.availabilityDate).format("MMM Do")} </p>
                  </div>
                )
              }
              {
                moment(listing.availabilityDate).isSameOrBefore(moment()) && (
                  <div className={`${styles.listing_section_one_info_tab_available} ${styles.listing_section_one_info_tab}`}>
                    <p>AVAILABLE NOW</p>
                  </div>
                )
              }
            </div>
            <div className={`${styles.listing_section_one_town}`}>
                <ImLocation/> {listing.town}
            </div>
            <div className={`${styles.listing_section_one_town_triangle}`}>
                
            </div>
          </div>
          <div onClick={toggleDisplayButton} className={`${styles.listing_section_two}`}>
            <div className={`${styles.listing_section_two_price} spacing-sm`}>
              <h2><Naira />{listing.price} </h2>
              <p>per month</p>
            </div>
            <div className={`spacing-sm ${styles.listing_section_two_title}`}>
              <h3>{listing.title} </h3>
              <p>{listing.address}</p>
              <p>{listing.streetName}, {listing.town} </p>
            </div>
            <div className={`spacing-sm ${styles.listing_section_two_icons}`}>
              <div>
                <BsHouse />
                <p>{listing.numberOfRooms} </p>
              </div>
              <div>
                <FaBath />
                <p>{listing.numberOfBathrooms} </p>
              </div>
            </div>
            <div 
              onClick={handleAddInterestListingChange} 
              className={`${styles.listing_section_two_interests}`}
            >
              <AiOutlineHeart />
            </div>
            <AnimatePresence mode="wait">
              {
                interested && (
                  <motion.div 
                    onClick={handleRemoveInterestListingChange} 
                    className={`${styles.listing_section_two_interests}`}
                    variants={opacityVariant}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <AiFillHeart />
                  </motion.div>
                )
              }
            </AnimatePresence>
          </div>
          <motion.div 
            animate={buttonAnimation}
            className={`${styles.listing_section_button}`}
          >
            <Link to={`/listings/?listingId=${listing._id}`}>
               <button onClick={openShowListing}>
                <span>Details</span>
                <FaAngleDoubleRight />
              </button>
            </Link>
          </motion.div>
        </div>
  )
}

export default Listing