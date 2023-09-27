import React from 'react'

// images
// images
import { housesImg } from "../../assets/images/index"

import "./style.css"

const Jumbo = prop => {
  return (
    <div className="app__jumbo grid">
      <div className='app__jumbo-img'>
        <img src={housesImg} alt="housesImg" />
      </div>
      <div className="app__jumbo-text flex flex__column flex__center">
        <h1 className="heading__avenir">Find a home that suits you with ease</h1>
      </div>
    </div>
  )
}

export default Jumbo