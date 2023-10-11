import React from "react"

// components
import { 
  SectionOne,
  SectionTwo,
  SectionThree,
  SectionFour,
  SectionFive,
  SectionSix,
  SectionSeven,
  SectionEight,
  SectionNine,
  Footer,
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
      <SectionFive />
      <SectionSix />
      <SectionSeven />
      <SectionEight />
      <SectionNine />
      <Footer />
    </div>
  )
}

export default HomeScreen