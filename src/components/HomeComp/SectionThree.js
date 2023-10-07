import React from 'react'

// import objects and functions
import {
  star2,
  bossLady,
} from "../../assets"

// importing css
import styles from "./sectionthree.module.css"

const SectionThree = () => {
  return (
    <section className={`${styles.sectionthree}`}>
      <div className={`${styles.sectionthree_container}`}>
        <div className={`${styles.sectionthree_img}`}>
          <img src={bossLady} alt="bossLady" />
        </div>

        <div className={`${styles.sectionthree_text}`}>
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
          <img className={`${styles.sectionthree_icons} ${styles.sectionthree_icons_star1}`} src={star2} alt="star1" />
          <img className={`${styles.sectionthree_icons} ${styles.sectionthree_icons_star2}`} src={star2} alt="star2" />
        </div>
      </div>
    </section>
  )
}

export default SectionThree