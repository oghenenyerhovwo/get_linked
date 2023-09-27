import { useState, useEffect } from 'react'
import moment from "moment"
import { useDispatch, useSelector } from 'react-redux'

// component
import { DotMenu } from "../../components"
import { MenuItem } from 'react-rainbow-components';
import { AnimatePresence, motion } from "framer-motion"
import {AiFillPushpin,} from "react-icons/ai"

// images
import { userIcon, } from "../../assets/"

// functions and objects
import { 
    deleteComment,
    pinComment,
    unPinComment,
  } from "../../actions"

// styles
import styles from "./comment.module.css"


const fadeAnimation = {
    hidden: {
      opacity: 0,
      transition: { ease: "linear", duration: 0.5},
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { ease: "linear", duration: 0.5},
    },
    exit: {
      opacity: 0,
      x: "-100vw",
      transition: { ease: "linear", duration: 0.5},
    },
  }


const Comment = props => {
    const {
        comment,
        listingId,
        listingAuthorId,
    }= props

    const dispatch = useDispatch()

    // global state
    const {
        idDeleteComment,
        successDeleteComment,
    } =  useSelector(state => state.commentStore)

    const {
        currentUser,
    } =  useSelector(state => state.userStore)

    const [imageUrl, setImageUrl] = useState(comment.author.profilePicture)
    const [display, setDisplay] = useState(true)

    useEffect(() => {
        if(successDeleteComment && idDeleteComment === comment._id){
            setDisplay(false)
        }
      }, [successDeleteComment, idDeleteComment, comment._id])

    const replaceImage = () => setImageUrl(userIcon)

    const handleDeleteComment = () => dispatch(deleteComment({id: comment._id, listingId}))
    const handlePinComment = () => {
        if(comment.pinned){
            dispatch(unPinComment({id: comment._id, listingId}))
        }else {
            dispatch(pinComment({id: comment._id, listingId}))
        }
    }

    return (
        <AnimatePresence mode="wait">
            {
                display && (
                    <motion.div 
                        className={`${styles.comment}`}
                        variants={fadeAnimation}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        key={`comment_${comment._id}`}
                    >
                        <div className={`${styles.comment_img}`}>
                            <img 
                                src={imageUrl} alt={"profile_pic"} 
                                onError={replaceImage}
                            />
                        </div>
                        <div className={`${styles.comment_body}`}>
                            <div className={`${styles.comment_body_heading} spacing-sm`}>
                                <div>
                                    <h3>
                                        {comment.author && `${comment.author.firstName} ${comment.author.lastName}`}
                                    </h3>
                                </div>
                                <div>
                                    <div></div>
                                    <p>{moment(comment.createdAt).fromNow()} </p>
                                </div>
                            </div>
                            <p>{comment.text}</p>
                        </div> 
                        <div className={`${styles.comment_dotmenu}`}>
                            <DotMenu>
                                {
                                    (currentUser._id === (comment.author && comment.author._id) || 
                                    currentUser._id === listingAuthorId ||
                                    currentUser.role === "admin") && (
                                        <MenuItem label="Delete" onClick={handleDeleteComment} />
                                    )
                                }
                                {
                                    (currentUser._id === (comment.author && comment.author._id) && 
                                    currentUser._id === listingAuthorId) && (
                                        <MenuItem label={!comment.pinned ? "Pin post" : "Unpin post"} onClick={handlePinComment} />
                                    )
                                }
                            </DotMenu>
                        </div>
                        {
                            comment.pinned && (
                                <div className={`${styles.comment_pin}`}>
                                    <AiFillPushpin />
                                </div>
                            )
                        }
                    </motion.div>
                )
            }
        </AnimatePresence>
    )
}

export default Comment