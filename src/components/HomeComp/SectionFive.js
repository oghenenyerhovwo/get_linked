import React from 'react'

// import objects and functions
import {
  questionMark,
  faqPic,
  purpleStar,
  star1,
  star2,
} from "../../assets"

// importing css
import styles from "./sectiontfive.module.css"

const SectionFive = () => {
  return (
    <section className={`${styles.sectiontfive}`}>
      <div className={`${styles.sectiontfive_container}`}>
        <div className={`${styles.sectiontfive_text}`}>
          <h2 className="spacing-sm">
            <span>Rules and</span>
            <span>Guidelines</span>
          </h2>
          <p>
            Our tech hackathon is a melting pot of visionaries, and its purpose is as
            clear as day: to shape the future. Whether you're a coding genius, a 
            design maverick, or a concept wizard, you'll have the chance to transform 
            your ideas into reality. Solving real-world problems, pushing the boundaries
            of technology, and creating solutions that can change the world,
            that's what we're all about!
          </p>
          <img className={`${styles.sectiontfive_icons} ${styles.sectiontfive_icons_star1}`} src={star2} alt="star1" />
          <img className={`${styles.sectiontfive_icons} ${styles.sectiontfive_icons_star2}`} src={star2} alt="star2" />
        </div>
        <div className={`${styles.sectiontfive_img}`}>
          <img src={faqPic} alt="faqPic" />
        </div>
      </div>
    </section>
  )
}

export default SectionFive