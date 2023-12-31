import React from "react"

// components

// importing css
import "./style.css"

const LoadingBox = () => {
  return (
    <div className="app_loaderbox">
        <div className="loading">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
        </div>
    </div>
  )
}

export default LoadingBox