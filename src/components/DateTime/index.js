import React, { useState, useEffect } from 'react'
import DateTimePicker from "react-datetime-picker"

import "./style.css"

const DateTime = props => {
    const {
        value,
        onChange,
        error,
        label,
    } = props

    const [inputError, setInputError] = useState()

    useEffect(() => {
        setInputError(error)
    }, [error])

    return (
        <div className={`app__datetime spacing-md grid ${inputError && "error"}`}>
            <label className="app__datetime-label smalltext__avenir">{label}</label>
            <div className="app__datetime-input smalltext__avenir">
                <DateTimePicker onChange={onChange} value={value} />
            </div>
            <p className="app__datetime-error smalltext__avenir">{inputError} </p>
        </div>
    )
}

export default DateTime