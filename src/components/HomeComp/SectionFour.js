import React from 'react'

// import objects and functions
import {
  judgingCriteria,
  purpleStar,
  star1,
  star2,
} from "../../assets"

// importing css
import styles from "./sectionfour.module.css"

const SectionFour = () => {
  return (
    <section className={`${styles.sectionfour}`}>
      <div className={`${styles.sectionfour_container}`}>
        <div className={`${styles.sectionfour_img}`}>
          <img src={judgingCriteria} alt="judgingCriteria" />
          <img className={`${styles.sectionfour_icons} ${styles.sectionfour_purpleStar}`} src={purpleStar} alt="purpleStar1" />
          <img className={`${styles.sectionfour_icons} ${styles.sectionfour_star1}`} src={star1} alt="star1" />
          <img className={`${styles.sectionfour_icons} ${styles.sectionfour_star2}`} src={star2} alt="star2" />
        </div>

        <div className={`${styles.sectionfour_text}`}>
          <h2 className="spacing-sm"><span>Judging Criteria</span>
            <span>Key attributes</span>
          </h2>
          <p className="spacing-sm">
            <span>Innovation and Creativity: </span> Evaluate the uniqueness and creativity of the
            solution. Consider whether it addresses a real-world problem in a novel 
            way or introduces innovative features.
          </p>
          <p className="spacing-sm">
            <span>Functionality: </span> Assess how well the solution works. Does it perform its 
            intended functions effectively and without major issues? Judges would
            consider the completeness and robustness of the solution.
          </p>
          <p className="spacing-sm">
            <span>Impact and Relevance: </span> Determine the potential impact of the solution 
            in the real world. Does it address a significant problem, and is it relevant 
            to the target audience? Judges would assess the potential social, 
            economic, or environmental benefits.
          </p>
          <p className="spacing-sm">
            <span>Technical Complexity: </span> Evaluate the technical sophistication of the solution. 
            Judges would consider the complexity of the code, the use of advanced 
            technologies or algorithms, and the scalability of the solution.
          </p>
          <p className="spacing-md">
            <span>Adherence to Hackathon Rules: </span> Judges will Ensure that the team adhered 
            to the rules and guidelines of the hackathon, including deadlines, use of 
            specific technologies or APIs, and any other competition-specific requirements.
          </p>
          <button className="register_button">
            Read More
          </button>
        </div>
      </div>
    </section>
  )
}

export default SectionFour