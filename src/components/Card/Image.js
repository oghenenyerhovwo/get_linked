import React from 'react'
import Image from 'next/image'

import styles from "./card.module.css"

const ImageCard = props => {
    const {
        src,
        alt,
    } = props
  return (
    <div className={`${styles.card_image}`}>
        <Image src={src} layout="fill" alt={alt || "image"} />
    </div>
  )
}

export default ImageCard