import React, { useRef, useEffect } from 'react';
import { useLocation } from "react-router-dom"

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

// importing css
import styles from "./home.module.css"

const HomeScreen = () => {
  const location = useLocation()
  const elTimeline = useRef();
  const elOverview = useRef();
  const elFaq = useRef();


  useEffect(() => {
    if(location.search.includes("scrollTo")){
      if(location.search.includes("timeline")){
        window.scrollTo(0, elTimeline.current.offsetTop)
      } else if(location.search.includes("overview")){
        window.scrollTo(0, elOverview.current.offsetTop)
      } else if(location.search.includes("faqs")){
        window.scrollTo(0, elFaq.current.offsetTop)
      }
    }
  }, [location.search])

  return (
    <div className={`${styles.home}`}>
      <SectionOne />
      <SectionTwo elOverview={elOverview} />
      <SectionThree />
      <SectionFour />
      <SectionFive elFaq={elFaq} />
      <SectionSix elTimeline={elTimeline} />
      <SectionSeven />
      <SectionEight />
      <SectionNine />
      <Footer />
    </div>
  )
}

export default HomeScreen