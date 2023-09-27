import React, { useState, useEffect } from 'react'
import TimePicker from "react-times"

import "./time.css"
import "react-times/css/classic/default.css"

const Time = props => {
    const {
        value,
        onChange,
        error,
        label,
        required,
        description,
    } = props

    const [inputError, setInputError] = useState()

    useEffect(() => {
        setInputError(error)
    }, [error])

  return (
    <div className={`app__time spacing-md grid ${inputError && "form__error"}`}>
        <label className="form__label spacing-sm">{label} <span className="icon_required">{label && required && "*"} </span> <span className="not_required">{label && !required && "(optional)"} </span></label>
        <div className="spacing-sm"> </div>
        <p className="form_description">{description} </p> 
        <div className="spacing-sm"> </div>
        <div className="app__time-input smalltext__avenir">
            <TimePicker 
                time={value}
                theme="classic"
                colorPalette="light"
                withoutIcon
                timeMode="12"
                timezone="America/New_York"
                showTimezone
                timeConfig={{
                    from: "09:00 AM",
                    to: "05:00 PM",
                }}
                onTimeChange={onChange}
            />
        </div>
        <p className="form__error-paragraph smalltext__avenir">{inputError} </p>
    </div>
  )
}

export default Time

// "react-datepicker": "^4.8.0",
//     "react-gradient-timepicker": "^0.0.3",
//     "react-times": "^3.1.12",
//     "reactjs-timepicker": "^1.0.7"