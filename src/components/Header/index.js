import React, { useState } from 'react'
import { AnimatePresence, motion } from "framer-motion"
import { Link } from "react-router-dom"

// objects, items and functions
import { hamburgerMenu, cancelIcon } from "../../assets"

// import css
import styles from "./header.module.css"

const navVariant = {
  hidden: {
    transform: "scaleY(0)",
  },
  visible: {
    transform: "scaleY(1)",
    transition: {
      duration: 1,
      ease: "easeInOut",
      times: [0, 0.8, 1],
      keyframes: ["scaleY(0)", "scaleY(1.1)", "scaleY(1)"],
    },
  },
  exit: {
    transform: "scaleY(0)",
    transition: {
      duration: 1,
      ease: "easeInOut",
      times: [0, 0.8, 1],
      keyframes: ["scaleY(1)", "scaleY(1.1)", "scaleY(0)"],
    },
  },
  
}

const NavLinks = (props) => {
  const {
    closeMenu,
  } = props

  return (
    <div className={`${styles.nav_links_container}`}>
      <ul>
          <li>
            <Link onClick={closeMenu} to="/">Home</Link>
          </li>
          <li>
            <Link onClick={closeMenu} to="/?scrollTo=timeline">Timeline</Link>
          </li>
          <li>
            <Link onClick={closeMenu} to="/?scrollTo=overview">Overview</Link>
          </li>
          <li>
            <Link onClick={closeMenu} to="/?scrollTo=faqs">FAQs</Link>
          </li>
          <li>
            <Link onClick={closeMenu} to="/contact">Contact</Link>
          </li>
      </ul>
      <button className="register_button">
        <Link onClick={closeMenu} to="/register">Register</Link>
      </button>
    </div>
  )
}

const Header = () => {
  const [displayMenu, setDisplayMenu] = useState(false)

  const openMenu= () => setDisplayMenu(prevToggle => !prevToggle)
  const closeMenu= () => setDisplayMenu(prevToggle => !prevToggle)

  return (
    <div className={`${styles.header}`}>
      <div className={`${styles.header_container}`}>
        <h3 className={`${styles.header_logo}`}>
          <Link to="/">
            <span>get</span>
            <span>linked</span>
          </Link>
        </h3>
        <div 
          className={`
            ${styles.navbar_smallscreen} 
            ${styles.navbar}
          `}
        >
          <img 
            className={`${styles.hamburger}`} 
            src={hamburgerMenu} 
            alt={"hamburgerMenu"} 
            onClick={openMenu}
          />
          <AnimatePresence mode="wait">
            {
              displayMenu && (
                <motion.div 
                  className={`${styles.navbar_smallscreen_overlay}`}
                  variants={navVariant}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  key="navbar_smallscreen_overlay"
                >
                  <div className={`${styles.navbar_smallscreen_overlay_container}`}>
                    <div 
                      className={`${styles.navbar_smallscreen_cancel_icon}`}
                      onClick={closeMenu}
                    >
                      <img src={cancelIcon} alt="cancelIcon" />
                    </div>
                    <NavLinks 
                      closeMenu={closeMenu}
                    />
                    </div>
                </motion.div>
              )
            }
          </AnimatePresence>
        </div>
        <nav 
          className={`${styles.navbar_largescreen} ${styles.navbar}`}
        >
          <NavLinks 
            closeMenu={closeMenu}
          />
        </nav>
      </div>
    </div>
  )
}

export default Header