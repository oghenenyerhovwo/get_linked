import React from 'react'
import { FaSpinner } from "react-icons/fa"

import "./style.css"

const Spinner = () => {
    return (
        <div className="app__spinner">
            <FaSpinner />
        </div>
    )
}

export default Spinner