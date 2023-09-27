import React, { useState, useEffect } from 'react'
import DatePicker from "react-datepicker"

import "./date.css"
import "react-datepicker/dist/react-datepicker.css"

const Date = props => {
    const {
        value,
        onChange,
        error,
        label,
        required,
        disabled,
        description,
    } = props

    const [inputError, setInputError] = useState()

    useEffect(() => {
        setInputError(error)
    }, [error])

  return (
    <div className={`app__date spacing-md ${inputError && "form__error"}`}>
    <label className="form__label spacing-sm">{label} <span className="icon_required">{label && required && "*"} </span> <span className="not_required">{label && !required && "(optional)"} </span></label>
        <div className="spacing-sm"> </div>
        <p className="form_description">{description} </p> 
        <div className="spacing-sm"> </div>
        <div className="spacing-sm"> </div>
        <div className="app__date-input smalltext__avenir">
            <DatePicker onChange={onChange} selected={value} />
            {disabled && <div className="app__date_disabled"></div> }
        </div>
        <p className="form__error-paragraph smalltext__avenir">{inputError} </p>
    </div>
  )
}

export default Date

// "react-datepicker": "^4.8.0",
//     "react-gradient-timepicker": "^0.0.3",
//     "react-times": "^3.1.12",
//     "reactjs-timepicker": "^1.0.7"