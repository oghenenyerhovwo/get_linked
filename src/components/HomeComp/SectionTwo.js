import React from 'react'

// import objects and functions
import {
  bigIdea,
  purpleStar,
  purpleArrow,
} from "../../assets"

// importing css
import styles from "./sectiontwo.module.css"

const SectionTwo = () => {
  return (
    <section className={`${styles.sectiontwo}`}>
      <div className={`${styles.sectiontwo_container}`}>
        <div className={`${styles.sectiontwo_img}`}>
          <img src={bigIdea} alt="bigIdea" />
          <img className={`${styles.sectiontwo_icons} ${styles.sectiontwo_icons_star1}`} src={purpleStar} alt="purpleStar1" />
          <img className={`${styles.sectiontwo_icons} ${styles.sectiontwo_icons_arrow}`} src={purpleArrow} alt="purpleStar1" />
        </div>

        <div className={`${styles.sectiontwo_text}`}>
          <h2 className="spacing-sm">
            <img className={`${styles.sectiontwo_icons} ${styles.sectiontwo_icons_star2}`} src={purpleStar} alt="purpleStar2" />
            <span>Introduction to getlinked</span>
            <span>tech Hackathon 1.0</span>
          </h2>
          <p>
            Our tech hackathon is a melting pot of visionaries, and its purpose is as
            clear as day: to shape the future. Whether you're a coding genius, a 
            design maverick, or a concept wizard, you'll have the chance to transform 
            your ideas into reality. Solving real-world problems, pushing the boundaries
            of technology, and creating solutions that can change the world,
            that's what we're all about!
          </p>
        </div>
      </div>
    </section>
  )
}

export default SectionTwo