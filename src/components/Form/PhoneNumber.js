import React, { useState, useEffect } from 'react'

import { PhoneInput } from 'react-rainbow-components';
import "./phonenumber.css"

const PhoneNumber = props => {
    const {
        onChange,
        label,
        required,
        error,
        value,
        errorMessage,
        description,
    }= props

    const [inputError, setInputError] = useState()

    useEffect(() => {
        setInputError(error)
    }, [error])

    return (
        <div  className={`spacing-lg ${inputError && "form__error"}`}>
            <label className="form__label spacing-sm">{label} <span className="icon_required">{label && required && "*"} </span> <span className="not_required">{label && !required && "(optional)"} </span></label>
            <div className="spacing-sm"> </div>
            <p className="form_description">{description} </p> 
            <div className="spacing-sm"> </div>
            <div className="phonenumber_form__field">
                <PhoneInput
                    // placeholder="Enter your phone number"
                    onChange={onChange}
                    value={value}
                />
            </div>
            {
                inputError && (
                    <p className="form__error-paragraph">{errorMessage || inputError} </p>
                )
            }
        </div>
    )
}

export default PhoneNumber