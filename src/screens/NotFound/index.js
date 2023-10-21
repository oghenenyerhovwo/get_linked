import React from 'react'

// images
import {
  notFound,
} from "../../assets"

import styles from "./notfound.module.css"

const NotFound = () => {
  return (
    <div className={`${styles.notfound}`}>
      <div className={`${styles.notfound_container}`}>
        <div className={`${styles.notfound_text_section_card_wrapper}`}>
          <div className={`${styles.notfound_img_section} spacing-sm`}>
            <img src={notFound} alt="notFound" />
          </div>
          <div className={`${styles.notfound_text_section_card}`}>
            <h4 className="spacing-sm">Oops!</h4>
            <h3 className="spacing-sm">Page Not Found</h3>
            <p className="spacing-sm">The page you are looking for does not exist or another error occored, go back to home page</p>
            <button className="register_button">Home</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound