import React from 'react'

// import objects and functions
import {
  privacyVector,
  securityLockVector,
  listTermsIcon,
} from "../../assets"

// importing css
import styles from "./sectionnine.module.css"


const SectionNine = () => {
  return (
    <section className={`${styles.sectionnine}`}>
      <div className={`${styles.sectionnine_container}`}>
        <div className={`${styles.sectionnine_text_section}`}>
          <h2 className="spacing-xs">
            <span>Privacy Policy and </span>
            <span>Terms</span>
          </h2>
          <p className="spacing-md">Last updated on September 12, 2023</p>
          <p className="spacing-md">
            Below are our privacy & policy, which outline a 
            lot of goodies. it’s our aim to always take of our 
            participant
          </p>
          <div className={`${styles.sectionnine_text_section_card}`}>
            <p className="spacing-md">
              At getlinked tech Hackathon 1.0, we 
              value your privacy and are committed 
              to protecting your personal information.
              This Privacy Policy outlines how we collect,
              use, disclose, and safeguard your data 
              when you participate in our tech hackathon 
              event. By participating in our event, you 
              consent to the practices described in this 
              policy.
            </p>
            <h4>Licensing Policy</h4>
            <h5 className="spacing-md">Here are terms of our Standard License:</h5>
            <div className={`${styles.sectionnine_text_section_card_list} spacing-md`}>
              <div  className="spacing-sm">
                <img src={listTermsIcon} alt="listTermsIcon" />
                <p>
                  The Standard License grants you a 
                  non-exclusive right to navigate and 
                  register for our event
                </p>
              </div>
              <div>
                <img src={listTermsIcon} alt="listTermsIcon" />
                <p>
                  The Standard License grants you a 
                  non-exclusive right to navigate and 
                  register for our event
                </p>
              </div>
            </div>
            <div className={`${styles.sectionnine_text_section_card_button}`}>
              <button className="register_button">Read More</button>
            </div>
          </div>
        </div>
        <div className={`${styles.sectionnine_img_section}`}>
          <img src={privacyVector} alt="privacyVector" />
          <img src={securityLockVector} alt="securityLockVector" />
        </div>
      </div>
    </section>
  )
}

export default SectionNine