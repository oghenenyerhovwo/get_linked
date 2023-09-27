import React from 'react'
import styles from "./testimonial.module.css"

const Testimonial = props => {
    const {
      picture,
      author,
      remark,
      _id,
    } = props
    
    return (
      <div className={`${styles.testimonial}`}>
        <div>
          <img className={`${styles.testimonial_picture}`} src={picture} alt={`testimonial_img_${_id}`} />
        </div>
        <div>
          <p className={`spacing-xs ${styles.testimonial_remark}`}>"{remark}"</p>
          <p className={`${styles.testimonial_author}`}>{author}</p>
        </div>
      </div>
    )
}

export default Testimonial