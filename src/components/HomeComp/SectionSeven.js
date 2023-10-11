import React, { useState } from 'react'

// import objects and functions
import {
  rewardCup,
  goldMedal,
  silverMedal,
  bronzeMedal,
} from "../../assets"

// importing css
import styles from "./sectionseven.module.css"

const rewards = [
  {
    _id: 1,
    position: "2nd",
    imgSrc: silverMedal,
    price: "N300,000"
  },
  {
    _id: 2,
    position: "1st",
    imgSrc: goldMedal,
    price: "N400,000"
  },
  {
    _id: 3,
    position: "3rd",
    imgSrc: bronzeMedal,
    price: "N150,000"
  },
]

const SectionSeven = () => {
  const [activeReward, setActiveReward] = useState(2)

  return (
    <section className={`${styles.sectionseven}`}>
      <div className={`${styles.sectionseven_container}`}>
        <div className={`${styles.sectionseven_text_section} spacing-md`}>
            <h2 className="spacing-sm">
              <span>Prizes and </span>
              <span>Rewards</span>
            </h2>
            <p>
              Highlight of the prizes or rewards for winners and for participants.
            </p>
          </div> 
          <div className={`${styles.sectionseven_img_section}`}>
            <div className={`${styles.sectionseven_img_section_cup}`}>
              <img src={rewardCup} alt="rewardCup" />
            </div>
            <div className={`${styles.sectionseven_img_section_medal}`}>
              {
                rewards.map(reward => {
                  const handleHoverOn = () => setActiveReward(reward._id)
                  const handleHoverOff = () => setActiveReward(2)

                  return (
                    <div 
                      key={reward._id}
                      className={`
                        ${styles.sectionseven_img_section_medal_card_wrapper} 
                        ${activeReward === reward._id && styles.sectionseven_img_section_medal_card_wrapper_active}
                      `}
                      onMouseEnter={handleHoverOn}
                      onMouseLeave={handleHoverOff}
                    >
                      <div
                        className={`
                        ${styles.sectionseven_img_section_medal_card}
                      `}
                      >
                        <div className={`${styles.sectionseven_img_section_medal_card_overlay}`}></div>
                        <img src={reward.imgSrc} alt={`reward${reward._id}}`} />
                        <h3 className="spacing-xs">{reward.position}</h3>
                        <h4 className="spacing-xs">Runner</h4>
                        <h3 className="spacing-xs">{reward.price}</h3>
                        </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
      </div>
    </section>
  )
}

export default SectionSeven