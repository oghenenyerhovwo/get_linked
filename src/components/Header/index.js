import { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { AnimatePresence, motion, useAnimation } from "framer-motion"

// importing components
import { Link } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaPlus } from 'react-icons/fa';
import { BiUserPlus } from 'react-icons/bi';
import DropOption from "../DropOption"
import { MenuItem } from 'react-rainbow-components';
import Google from "../Google"

// functions
import { signOut } from "../../actions"
import { logo, userIcon } from "../../assets"

// importing css
import styles from "./header.module.css"

const navSmallScreenVariant = {
  hidden: {
    clipPath: "circle(0% at 100% 1%)",
    transition: {duration: 0.2, ease: "easeInOut"},
  },
  visible: {
    clipPath: "circle(144% at 100% 1%)",
    transition: {duration: 0.2, ease: "easeInOut"},
  },
}

const UserIcon = () => {
  const dispatch = useDispatch()

  const { currentUser } =  useSelector(state => state.userStore)

  const [profilePic, setProfilePic] = useState(currentUser.profilePicture)

  const signUserOut = () => {
    dispatch(signOut())
  }

  const replaceImage = () => setProfilePic(userIcon)

  return (
    <DropOption 
      parentComp={
         <img 
          className={`${styles.user_icon_image}`} 
          src={profilePic} alt={"profile_pic"} 
          onError={replaceImage}
        />
     }
      childrenComp={
        <>
          <MenuItem label="Sign out" onClick={signUserOut} />
        </>
      }
    />
  )
}


const Header = () => {
  const hamburgerAnimation = useAnimation()
  const menuRef = useRef(null)

  // global state
  const { currentUser } =  useSelector(state => state.userStore)
  const [displayMenu, setDisplayMenu] = useState(false)

  const closeMenuWhnClickOutside = e => {
    if(menuRef.current && displayMenu && !menuRef.current.contains(e.target)){
      setDisplayMenu(false)
    }
  }  

  useEffect(() => {
    if(displayMenu){
      hamburgerAnimation.start({
        rotate: -90,
        transition: { duration: 0.2, },
      })
    } else {
      hamburgerAnimation.start({
        rotate: 0,
        transition: { duration: 0.2, },
      })
    }
  }, [displayMenu, hamburgerAnimation])

  useEffect(() => {
    const rootElement = document.getElementById("root")
    rootElement.addEventListener('mousedown', closeMenuWhnClickOutside)
    return () => {
      rootElement.removeEventListener('mousedown', closeMenuWhnClickOutside)
    };
  })

  const toggleMenu = e => setDisplayMenu(prevToggle => !prevToggle)

  return (
    <header className={`${styles.header}`}>
      <div className={`flex ${styles.navbar_container} container`}>
        <div className={`${styles.nav_brand}`}>
          <Link to="/">
            <img src={logo} alt="logo" /> 
            <h3>Secure Rent </h3>
          </Link>
        </div>
        <nav 
            className={`${styles.nav_bar} ${styles.nav_bar_largescreen}`} 
          >
            <ul>
              <li><Link className={`${styles.nav_links}`} to="/">Home</Link></li>
              <li><Link className={`${styles.nav_links}`} to="/about">Find Agent</Link></li>
              <li><Link className={`${styles.nav_links}`} to="/listings">Listings</Link></li>
            </ul>
            {currentUser.email && <ul className={`${styles.nav_line}`}></ul>}
            <ul>
              {
                  currentUser.email && (
                    <Link className={`${styles.nav_links} ${styles.nav_links_listing}`}  to="/add_listing">
                      <FaPlus /> {"  "}
                      <span>Add Listing</span>
                    </Link>
                  )
                }
            </ul>
            <ul>
                {
                  !currentUser.email && (
                    <Google>
                      <div className={`${styles.nav_button_container}`}>
                        <button className={`${styles.nav_button}`}>
                          Sign In
                        </button>
                        <div className={`${styles.nav_button_overlay}`}></div>
                      </div>
                    </Google>
                  )
                }
            </ul>
            <ul>
              {
                currentUser.email &&  (
                  <div className={`${styles.user_icon}`}>
                    <UserIcon />
                  </div>
                )
              }
            </ul>            
          </nav>
        <AnimatePresence mode="wait">
          {
            displayMenu && (
              <motion.nav 
                className={`${styles.nav_bar} ${styles.nav_bar_smallscreen}`} 
                variants={navSmallScreenVariant}
                initial="hidden"
                animate="visible"
                exit="hidden"
                key="nav_smallscreen"
                ref={menuRef}
              >
                <ul>
                  <li><Link className={`${styles.nav_links}`} to="/">Home</Link></li>
                  <li><Link className={`${styles.nav_links}`} to="/about">Find Agent</Link></li>
                  <li><Link className={`${styles.nav_links}`} to="/listings">Listings</Link></li>
                  {
                    currentUser.email ? (
                      <Link className={styles.nav_links}  to="/add_listing">
                        Add Apartment Listing
                      </Link>
                    ): (
                      <Google>
                        <Link className={styles.nav_links}  to="#">Sign Up</Link>
                      </Google>
                    )
                  }
                </ul>            
              </motion.nav>
            )
          }   
        </AnimatePresence>   
        <div className={`${styles.nav_icons}`}>
          {
            currentUser.email ? (
              <div className={`${styles.user_icon}`}>
               <UserIcon />
              </div>
            ) : (
              <div className={`${styles.user_icon}`}>
                <Google>
                  <BiUserPlus />
                </Google>
              </div>
            )
          }
          <motion.div 
            animate={hamburgerAnimation}
            onClick={toggleMenu} 
            className={`${styles.menu_icon}`}
          >
            <GiHamburgerMenu />
          </motion.div>
        </div>  
      </div>
    </header>
  )
}

export default Header