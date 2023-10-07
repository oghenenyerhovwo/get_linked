import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"

// import objects and functions
import {
  bulbIcon,
  chainIcon,
  curvedLine,
  hackathonGuy,
  hackathonPlanet,
  star1,
  star2,
  sunIcon,
} from "../../assets"

// importing css
import styles from "./sectionone.module.css"

const SectionOne = () => {
    const initialTimeInSeconds = 24 * 60 * 60
    const [timeInSeconds, setTimeInSeconds] = useState(initialTimeInSeconds)
    
    useEffect(() => {
      const interval = setInterval(() => {
        setTimeInSeconds(prevTime => {
            if(prevTime === 0){
                clearInterval(interval)
            } else {
                return prevTime - 1
            }
        })
      }, 1000);

      return () => {
        clearInterval(interval)
      };
    }, [])
    return (
        <section className={`${styles.section_one}`}>
            <div className={`${styles.section_one_igniting}`}>
                <p>Igniting a Revolution in HR Innovation</p>
                <img src={curvedLine} alt="curvedLine"/>
            </div>
            <div className={`${styles.section_one_row}`}>
                <div className={`${styles.section_one_text_col}`}>
                    <div className={`${styles.section_one_title}`}>
                        <div className={`${styles.section_one_title_star}`}>
                            <img src={star2} alt={star2} />
                            <img src={star2} alt={star1} />
                        </div>
                        <h2 className={`${styles.section_one_title_get}`}> 
                            getlinked Te
                            <span className={`${styles.section_one_title_bulb}`}>
                                <span>c</span>
                                <img src={bulbIcon} alt={bulbIcon} />
                            </span> 
                            h
                        </h2>
                        <h2 className={`${styles.section_one_title_hack}`}> 
                            Hackathon 
                            <span>1.0</span>
                            <img src={chainIcon} alt="chainIcon" />
                            <img src={sunIcon} alt="sunIcon" />
                        </h2>
                        <p>Participate in getlinked tech Hackathon 2023 stand a chance to win a Big prize</p>
                        <button className="register_button spacing-sm">
                        <Link to="/register">Register</Link>
                        </button>
                        <div className={`${styles.section_one_title_countdown}`}>
                            <div>
                                <h2>{Math.floor(timeInSeconds / 3600)}</h2>
                                <p>H</p>
                            </div>
                            <div>
                                <h2>{Math.floor((timeInSeconds % 3600) / 60)}</h2>
                                <p>M</p>
                            </div>
                            <div>
                                <h2>{Math.floor(timeInSeconds % 60)}</h2>
                                <p>S</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.section_one_img_col}`}>
                    <img src={hackathonGuy} alt="hackathonGuy" />
                    <img src={hackathonPlanet} alt="hackathonPlanet" />
                </div>
            </div>
        </section>
    )
}

export default SectionOne