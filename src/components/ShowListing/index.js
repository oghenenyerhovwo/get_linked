import { useState, useEffect, useRef, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

// Components
import { AnimatePresence, motion } from "framer-motion"
import {AiFillHeart, AiOutlineHeart,} from "react-icons/ai"
import {FaPhone} from "react-icons/fa"
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
import { Form, Comment, Naira, VideoPlayer, } from "../../components"

// functions
import { 
  getListing, 
  addInterestListing,
  getComments,
  createComment,
} from "../../actions"

// styles
import styles from  "./showlisting.module.css"

// images
import { noImagePic, } from "../../assets/"
import { sortComments } from "../../utils/"

const imageAnimation = {
  hidden: {
    x: 20,
    opacity: 0.4,
    transition: { ease: "easeInOut", duration: 0.5},
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: { ease: "easeInOut", duration: 0.5},
  },
  exit: {
    x: -10,
    opacity: 0.4,
    transition: { ease: "easeInOut", duration: 0.5},
  },
}

const fadeAnimation = {
  hidden: {
    opacity: 0,
    transition: { ease: "linear", duration: 0.5},
  },
  visible: {
    opacity: 1,
    transition: { ease: "linear", duration: 0.5},
  },
  exit: {
    opacity: 0,
    transition: { ease: "linear", duration: 0.5},
  },
}

const backgroundAnimation = {
  hidden: {
    y: "120vh",
    opacity: 0.4,
    transition: { ease: "linear", duration: 1},
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: { ease: "linear", duration: 1},
  },
}

const ImageComp = props => {
  const { image } = props

  const [imageUrl, setImageUrl] = useState(image.url)

  const replaceImage = () => setImageUrl(noImagePic)

  return (
    <motion.img 
        variants={imageAnimation}
        initial="hidden"
        animate="visible"
        exit="exit"
        key={`show_image_animate${image._id}`}
        src={imageUrl} 
        alt={`image-${image._id}`} 
        onError={replaceImage}
    />
  )
}

const ShowListing = props => {
  const { 
    currentUser,
    showListingState, 
    setShowListingState,
    userInterestedListings, 
    setUserInterestedListings,
  } =  props

  const showListingRef = useRef(null)  
  const commentSectionRef = useRef(null);
  const dispatch = useDispatch()
  
  // global state
  const {
    listing, 
    // errorGetListing, 
    successGetListing, 
    // loadingGetListing
  } =  useSelector(state => state.listingStore)

  // global state
  const {
    comments,
    successCreateComment,
  } =  useSelector(state => state.commentStore)

  const [imageIndex, setImageIndex] = useState(0)
  const [displayImage, setDisplayImage] = useState(true)
  const [interested, setInterested] = useState([false])
  const [tabKey, setTabKey] = useState("Description")
  const [commentText, setCommentText] = useState("")
  const [allImages, setAllImages] = useState([])
  const [sortedComments, setSortedComments] = useState([])

  useEffect(() => {
    dispatch(getListing(showListingState._id))
  }, [dispatch, showListingState._id])

  useEffect(() => {
    if(successGetListing){
      dispatch(getComments(listing.comments))
      setAllImages([
        {url: listing.mainImage, _id: -1},
        ...listing.images,
      ])
    }
  }, [successGetListing, dispatch, listing])

  useEffect(() => {
    if(successCreateComment){
      setCommentText("")
      commentSectionRef.current && window.scrollTo(15, commentSectionRef.current.offsetTop)
    }
  }, [successCreateComment, comments])

  useEffect(() => {
    setSortedComments(sortComments(comments))
  }, [comments])

  useEffect(() => {
    const closeShowListing =  e => {
      if(showListingRef.current && showListingState.display && !showListingRef.current.contains(e.target)){
        setShowListingState({display: false, listing: {}})
      }
    }
    const rootElement = document.getElementById("root")
    rootElement.addEventListener('mousedown', closeShowListing)
    return () => {
      rootElement.removeEventListener('mousedown', closeShowListing)
    };
  })

  useEffect(() => {
    let timeout
    const allImagesLength = allImages.length 
    const changeImage = () => {
      setImageIndex(prevIndex => {
        return prevIndex >= allImagesLength - 1 ? 0 : prevIndex + 1
      })
    }
    const interval = setInterval(() => {
      setDisplayImage(false)
      timeout = setTimeout(() => {
        setDisplayImage(true)
        changeImage()
      }, 500);
    }, 30000);
    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    };
  }, [listing.images, listing.mainImage, allImages.length])

  useEffect(() => {
    if(listing.interests && listing.interests.includes(currentUser._id)){
      setUserInterestedListings(prevData => [...prevData, listing._id])
    } else {
      setUserInterestedListings(prevData => prevData.filter(listId => listId !== listing._id))
    }
  }, [currentUser._id, listing.interests, listing._id, setUserInterestedListings])

  useEffect(() => {
    if(userInterestedListings.includes(listing._id)){
      setInterested(true)
    } else {
      setInterested(false)
    }
  }, [userInterestedListings, listing._id])

  const leftArrowActive = imageIndex > 0 && styles.show_listing_section_one_media_img_arrows_icon_active
  const rightArrowActive = imageIndex < allImages.length - 1 && styles.show_listing_section_one_media_img_arrows_icon_active
  const numberOfInterests = listing.interests && listing.interests.includes(currentUser._id) ? listing.interests.length : 
    listing.interests && listing.interests.length + userInterestedListings.filter(listingId => listingId === listing._id).length
  const tabs = listing.video ? ["Description", "Comment", "Map", "Video"] : ["Description", "Comment", "Map"]

  const leftScroll = () => {
    if(imageIndex > 0){
      setImageIndex(prevIndex => prevIndex - 1)
    }
  }

  const rightScroll = () => {
    if(imageIndex < allImages.length - 1 ){
      setImageIndex(prevIndex => prevIndex + 1)
    }
  }

  const handleAddInterestListingChange = () => {
    dispatch(addInterestListing(listing._id))
    setInterested(true)
    setUserInterestedListings(prevData => [...prevData, listing._id])
  }

  const postComment = () => {
    dispatch(createComment({listingId: listing._id, form: {text: commentText}}))
  }

  return (
    <motion.div
      ref={showListingRef} 
      className={`${styles.show_listing}`}
      variants={backgroundAnimation}
      initial="hidden"
      animate="visible"
    >
      <div className="container">
        <div className={`${styles.show_listing_section_one} spacing-md`}>
          <div className={`${styles.show_listing_section_one_media}`}>
            <div className={`${styles.show_listing_section_one_media_img}`}>
              <div className={`${styles.show_listing_section_one_media_img_file} spacing-sm`}>
                {
                  displayImage && allImages.length > 0 && allImages.map((image) =>  {
                      return (
                      <Fragment key={image._id}>
                        {
                          allImages[imageIndex]._id === image._id && (
                            <AnimatePresence mode="wait">
                              <ImageComp image={image} />
                            </AnimatePresence>
                          )
                        }
                      </Fragment>
                    )
                  })
                }
              </div>
              {
                allImages.length > 1 && (
                  <div className={`${styles.show_listing_section_one_media_img_arrows}`}>
                    <BsArrowLeftShort 
                      onClick={leftScroll} 
                      className={`${styles.show_listing_section_one_media_img_arrows_icon} ${leftArrowActive}`}
                    />
                    <BsArrowRightShort
                      onClick={rightScroll} 
                      className={`${styles.show_listing_section_one_media_img_arrows_icon} ${rightArrowActive}`}
                    />
                  </div>
                )
              }
              <div className={`${styles.show_listing_section_one_media_img_circle_container}`}>
                {
                  allImages.length > 1 && allImages.map(image => (
                    <div 
                      className={`${styles.show_listing_section_one_media_img_circle} ${allImages[imageIndex]._id === image._id && styles.show_listing_section_one_media_img_circle_active}`} 
                      key={image._id}
                    ></div>
                  ))
                }
              </div>
            </div>
          </div>
          <div className={`${styles.show_listing_section_one_text}`}>
            <h2 
              className={`spacing-sm ${styles.show_listing_section_one_text_title}`}
            >
              {listing.title} 
            </h2>
            {
              numberOfInterests > 0 && (
                <p 
                  className={`spacing-sm ${styles.show_listing_section_one_text_interest}`}
                > 
                  {numberOfInterests} person(s) interested 
                </p>
              )
            }
            <div className={`spacing-sm ${styles.show_listing_section_one_text_price}`}>
              <h3>
                <Naira />
                <span>{listing.price}</span>
              </h3>
              <p>per month</p>
            </div>
            <div className={`${styles.show_listing_section_one_text_wishlist_container}`}>
              <AnimatePresence mode="wait">
                {
                  interested && (
                    <motion.p 
                      className={`${styles.show_listing_section_one_text_wishlist}`}
                      variants={fadeAnimation}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      key="showlist_wishlist_animate1"
                    >
                      <AiFillHeart />
                      <span>Already in wish list</span>
                    </motion.p>
                  ) 
                }
              </AnimatePresence>
              <AnimatePresence mode="wait">
                {
                  !interested && (
                    <motion.p 
                      className={`${styles.show_listing_section_one_text_wishlist} ${styles.show_listing_section_one_text_wishlist_no_interest}`}
                      variants={fadeAnimation}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      key="showlist_wishlist_animate3"
                      onClick={handleAddInterestListingChange}
                    >
                      <AiOutlineHeart />
                      <span>Add to wish list</span>
                    </motion.p>
                  ) 
                }
              </AnimatePresence>
            </div>
          </div>
        </div>
        <div className={`${styles.show_listing_section_divide_line} spacing-md`}></div>
        <div className={`${styles.show_listing_section_two} spacing-sm`}>
          <div className={`${styles.show_listing_section_two_tab_container} spacing-sm`}>
              {
                tabs.map(item => {
                  const changeTab = () => setTabKey(item)
                  return (
                    <div 
                      className={`${styles.show_listing_section_two_tab} ${tabKey === item && styles.show_listing_section_two_tab_active}`}
                      key={item}
                      onClick={changeTab}
                    >
                      <button>{item}</button>
                    </div>
                    
                  )
                })
              }
          </div>
          <AnimatePresence mode="wait">
            {
              tabKey === "Description" && (
                <motion.div
                  className={`${styles.show_listing_section_two_tab_description}`}
                  variants={fadeAnimation}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  key="showlisttab1"
                >
                  <h2 className={`spacing-md`}>Description</h2>
                  <h3 className={`spacing-sm`}>{listing.title}</h3>
                  <div className={`${styles.show_listing_section_two_tab_description_item}`}>
                    <p>Category:</p>
                    <p>{listing.category} </p>
                  </div>
                  <div className={`${styles.show_listing_section_two_tab_description_item}`}>
                    <p>Address:</p>
                    <p>{listing.address},{listing.lga}, {listing.state} </p>
                  </div>
                  <div className={`${styles.show_listing_section_two_tab_description_item}`}>
                    <p>Negotiable:</p>
                    <p>{listing.isPriceNegotiable ? "true": "false"} </p>
                  </div>
                  <div className={`${styles.show_listing_section_two_tab_description_item}`}>
                    <p>Rental Period:</p>
                    <p>{listing.rentalPeriod} </p>
                  </div>
                  {
                    listing.agentFee && (
                      <div className={`${styles.show_listing_section_two_tab_description_item}`}>
                        <p>Agent fee:</p>
                        <p><Naira /> {listing.agentFee} </p>
                      </div>
                    )
                  }
                  <div className={`${styles.show_listing_section_two_tab_description_item}`}>
                    <p>Availability:</p>
                    <p>{moment(listing.availabilityDate).isSameOrBefore(moment()) ? "available Now" : `Unavailable until ${moment(listing.availabilityDate).format("MMMM Do YYYY")}`} </p>
                  </div>
                  <div className={`${styles.show_listing_section_two_tab_description_item}`}>
                    <p>Number of Rooms:</p>
                    <p>{listing.numberOfRooms} </p>
                  </div>
                  <div className={`${styles.show_listing_section_two_tab_description_item}`}>
                    <p>Number of Bathrooms:</p>
                    <p>{listing.numberOfBathrooms} </p>
                  </div>
                  <div className={`${styles.show_listing_section_two_tab_description_item} spacing-md`}>
                    <p>{listing.description} </p>
                  </div>
                  <div className={`${styles.show_listing_section_two_tab_description_author}`}>
                    <p className={`spacing-sm`}>post by {listing.author && `${listing.author.firstName} ${listing.author.lastName}`} </p>
                    <div className={`${styles.show_listing_section_two_tab_description_author_icon}`}>
                        <a href={`tel: ${listing.author && listing.author.phoneNumber && listing.author.phoneNumber.phone}`}><FaPhone /> </a>
                    </div>
                  </div>
                </motion.div>
              ) 
            }
          </AnimatePresence>
          <AnimatePresence mode="wait">
            {
              tabKey === "Comment" && (
                <motion.div
                  className={`${styles.show_listing_section_two_tab_comment}`}
                  variants={fadeAnimation}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  key="showlisttab2"
                  ref={commentSectionRef}
                >
                  <div className={`spacing-md`}>
                    {
                      sortedComments.length > 0 && sortedComments.map(comment => {
                        return (
                        <Fragment key={comment._id}>
                          <Comment 
                            comment={comment} 
                            listingAuthorId={listing.author && listing.author._id} 
                            listingId={listing._id} 
                          />
                        </Fragment>
                        )
                      })
                    }
                  </div>
                  <div>
                    <Form.EmojiPickerInput
                      seInput={setCommentText}
                      input={commentText}
                      placeholder="Enter comment"
                      handleSubmit={postComment}
                    />
                  </div>
                </motion.div>
              ) 
            }
          </AnimatePresence>
          <AnimatePresence mode="wait">
            {
              tabKey === "Map" && (
                <motion.div
                  className={`${styles.show_listing_section_two_tab_map}`}
                  variants={fadeAnimation}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  key="showlisttab3"
                >
                  <h2 className={`spacing-sm`}>Features</h2>
                </motion.div>
              ) 
            }
          </AnimatePresence>
          <AnimatePresence mode="wait">
            {
              tabKey === "Video" && (
                <motion.div
                  className={`${styles.show_listing_section_two_tab_video}`}
                  variants={fadeAnimation}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  key="showlisttab3"
                >
                  <div className={`spacing-md`}> </div>
                  <VideoPlayer url={listing.video} />
                </motion.div>
              ) 
            }
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

export default ShowListing