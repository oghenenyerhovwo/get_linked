import React from 'react'
import styles from "./footer.module.css"
import Link from "next/link"

import { FaFacebook } from "react-icons/fa"

const Footer = () => {
  return (
    <div className={styles.footer}>
      
      <div className={`container ${styles.footer_container}`}> 

        <h4 className="spacing-md">YOMM TO THE WORLD</h4>
        
        <div className={`${styles.links} spacing-md`}>
          <Link href={"#"}><a className={`spacing-sm ${styles.footer_link}`}>SUPPORT </a></Link>
          <Link href={"#"}><a className={`spacing-sm ${styles.footer_link}`}>SUPPORT </a></Link>
          <Link href={"#"}><a className={`spacing-sm ${styles.footer_link}`}>SUPPORT </a></Link>
        </div>

        <div className={`${styles.connect}`}>
          <h5 className="spacing-md">Connect with Us</h5>
          <Link href={"#"}><a className={`spacing-sm flex flex__center ${styles.footer_link}`}>Facebook <FaFacebook /> </a></Link>
          <Link href={"#"}><a className={`spacing-sm ${styles.footer_link}`}>Email </a></Link>
        </div>

      </div>      
      
    </div>
  )
}

export default Footer