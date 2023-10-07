import React from "react"

// components
import { 
  SectionOne,
  SectionTwo,
  SectionThree,
  SectionFour,
} from "../../components"

// import objects and functions
import { } from "../../assets"

// importing css
import styles from "./home.module.css"

const HomeScreen = () => {

  return (
    <div className={`${styles.home}`}>
      <SectionOne />
      <SectionTwo />
      <SectionThree />
      <SectionFour />
    </div>
  )
}

export default HomeScreen