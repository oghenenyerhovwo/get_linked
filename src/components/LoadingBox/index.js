import React from "react"

// components
import { FaHome } from "react-icons/fa"

// importing css
import "./style.css"

const LoadingBox = () => {
  return (
    <div className="app_loaderbox">
        <div className="app_loaderbox-loading">
          <FaHome />
        </div>
    </div>
  )
}

export default LoadingBox