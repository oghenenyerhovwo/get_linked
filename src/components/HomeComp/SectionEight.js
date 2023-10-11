import React from 'react'

// import objects and functions
import {
  libertyAssuredLogo,
  libertyPayLogo,
  winWiseLogo,
  whispermsLogo,
  payboxLogo,
  vizualPlusLogo,
} from "../../assets"

// importing css
import styles from "./sectioneight.module.css"


const SectionEight = () => {
  return (
    <section className={`${styles.sectioneight}`}>
      <div className={`${styles.sectioneight_container}`}>
        <div className={`${styles.sectioneight_text_section}`}>
            <h2 className="spacing-sm">Partners and Sponsors</h2>
            <p>
              Getlinked Hackathon 1.0 is honored to have the following major 
              companies as its partners and sponsors
            </p>
        </div> 
        <div className={`${styles.sectioneight_img_section}`}>
          <div className={`${styles.sectioneight_img_section_row}`}>
            <div>
              <img src={libertyAssuredLogo} alt="libertyAssuredLogo" />
            </div>
            <div className={`${styles.sectioneight_img_section_column_lines}`}></div>
            <div>
              <img src={libertyPayLogo} alt="libertyPayLogo" />
            </div>
            <div className={`${styles.sectioneight_img_section_column_lines}`}></div>
            <div>
              <img src={winWiseLogo} alt="winWiseLogo" />
            </div>
          </div>
          <div className={`${styles.sectioneight_img_section_row_lines_wrapper}`}>
            <div className={`${styles.sectioneight_img_section_row_lines_container}`}>
              <div className={`${styles.sectioneight_img_section_row_lines}`}></div>
            </div>
            <div className={`${styles.sectioneight_img_section_row_lines_container}`}>
              <div className={`${styles.sectioneight_img_section_row_lines}`}></div>
            </div>
            <div className={`${styles.sectioneight_img_section_row_lines_container}`}>
              <div className={`${styles.sectioneight_img_section_row_lines}`}></div>
            </div>
          </div>
          <div className={`${styles.sectioneight_img_section_row}`}>
            <div>
              <img src={whispermsLogo} alt="whispermsLogo" />
            </div>
            <div className={`${styles.sectioneight_img_section_column_lines}`}></div>
            <div>
              <img src={payboxLogo} alt="payboxLogo" />
            </div>
            <div className={`${styles.sectioneight_img_section_column_lines}`}></div>
            <div>
              <img src={vizualPlusLogo} alt="vizualPlusLogo" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SectionEight