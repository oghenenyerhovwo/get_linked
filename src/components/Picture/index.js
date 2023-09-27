import React from 'react'

// css
import "./style.css"

const Picture = props => {
  const {
    url,
    title,
    description,
  } = props
  return (
    <div className="app__picture flex flex__column">
      <img className="space-md" src={url} alt={title} />
      <h2 className="subheading__nexa space-md">{title} </h2>
      <p className="smalltext__nexa space-md">{description} </p>
    </div>
  )
}

export default Picture