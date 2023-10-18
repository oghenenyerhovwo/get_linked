import React from 'react'
import { AnimatePresence, motion } from "framer-motion"
import { Link } from "react-router-dom"

// import objects and functions
import {
    successfulMan,
    successfulIcon,
    winkEmoji,
} from "../../assets"

// importing css
import styles from "./success.module.css"

const backdropVariant = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeInOut",
        times: [0, 0.8, 1],
        keyframes: [0, 0.4, 1],
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 1,
        ease: "easeInOut",
        times: [0, 0.8, 1],
        keyframes: [1, 0.4, 1],
      },
    },
}

const successVariant = {
    hidden: {
      y: "-100vh",
    },
    visible: {
      y: "0vh",
      transition: {
        duration: 1,
        ease: "easeInOut",
        times: [0, 0.8, 1],
        keyframes: ["-100vh", "-70vh", "0vh"],
      },
    },
    exit: {
      y: "-100vh",
      transition: {
        duration: 1,
        ease: "easeInOut",
        times: [0, 0.8, 1],
        keyframes: ["0vh", "-70vh", "-100vh"],
      },
    },
  }

const SuccessfulRegistration = props => {
    const { success } = props
   
    return (
        <AnimatePresence mode="wait">
            {
                success && (
                    <div 
                        className={`${styles.successful_registration_container}`}
                        variants={backdropVariant}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        key="success_backdrop"
                    >
                        <motion.div 
                            className={`${styles.successful_registration}`}
                            variants={successVariant}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <div className={`${styles.successful_registration_img} spacing-lg`}>
                                <img src={successfulIcon} alt="successfulIcon" />
                                <img src={successfulMan} alt="successfulMan" />
                            </div>
                            <h2 className="spacing-sm">
                                <span>Congratulations</span>
                                <span>you have successfully Registered!</span>
                            </h2>
                            <div className={`${styles.successful_registration_paragraph} spacing-sm`}>
                                <p>Yes, it was easy and you did it! check your mail box for next step</p>
                                <img src={winkEmoji} alt="winkEmoji" />
                            </div>
                            <button type="submit" className="register_button">
                                <Link to="/">Back</Link>
                            </button>
                        </motion.div>
                    </div>
                )
            }
        </AnimatePresence>
    )
}

export default SuccessfulRegistration