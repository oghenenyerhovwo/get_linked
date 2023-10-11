import React from 'react'
import { Link } from "react-router-dom"

// objects, items and functions
import { 
  linkedInIcon,
  facebookIcon,
  xIcon,
  instagramIcon,
  phoneIcon,
  locationIcon,
} from "../../assets"

// import css
import styles from "./footer.module.css"

const Footer = () => {
  return (
    <div className={`${styles.footer}`}>
      <div className={`${styles.footer_container}`}>
        <div>
          <div className={`${styles.footer_col1} spacing-md`}>
            <h2 className={`${styles.footer_logo} spacing-sm`}>
              <Link to="/">
                <span>get</span>
                <span>linked</span>
              </Link>
            </h2>
            <p className={`spacing-md`}>
              Getlinked Tech Hackathon is a technology
              innovation program established by a group 
              of organizations with the aim of showcasing 
              young and talented individuals in the field 
              of technology
            </p>
            <div>
              <p>Terms of Use</p>
              <div></div>
              <p>Privacy Policy</p>
            </div>
          </div>
          <div className={`${styles.footer_col2} spacing-md`}>
            <h3 className="spacing-xs">Useful Links</h3>
            <p className="spacing-xs">Overview</p>
            <p className="spacing-xs">Timeline</p>
            <p className="spacing-xs">FAQs</p>
            <p className="spacing-xs">Register</p>
            <div>
              <h4>Follow us</h4>
              <div>
                <img src={instagramIcon} alt="instagramIcon" />
                <img src={xIcon} alt="xIcon" />
                <img src={facebookIcon} alt="facebookIcon" />
                <img src={linkedInIcon} alt="linkedInIcon" />
              </div>
            </div>
          </div>
          <div className={`${styles.footer_col3} spacing-md`}>
           <h3 className="spacing-xs">Contact</h3>
            <div>
              <img src={phoneIcon} alt="phoneIcon" />
              <p>+234  6707653444</p>
            </div>
            <div>
              <img src={locationIcon} alt="locationIcon" />
              <p>27,Alara Street Yaba 100012 Lagos State</p>
            </div>
          </div>
        </div>
        <p>All rights reserved. © getlinked Ltd.</p>
      </div>
    </div>
  )
}

export default Footer