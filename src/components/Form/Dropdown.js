import React, { useState, useEffect } from 'react'

import "./dropdown.css"
// 
// BiShow
const Dropdown = props => {
    const {
        value,
        onChange,
        name,
        label,
        error,
        placeholder,
        disabled,
        required,
        description,
    } = props

const [inputError, setInputError] = useState()

useEffect(() => {
    setInputError(error)
}, [error])

  return (
    <div className={`app__dropdown spacing-md ${error && "form__error"}`}>
        <label className="form__label spacing-sm">{label} <span className="icon_required">{label && required && "*"} </span> <span className="not_required">{label && !required && "(optional)"} </span></label>
        <div className="spacing-sm"> </div>
        <p className="form_description">{description} </p> 
        <div className="spacing-sm"> </div>
        <select
            className={`form__field ${name}`} 
            onChange={onChange}
            value={value}
            name={name}
            placeholder={placeholder}
            disabled={disabled}
        >
            {props.children}
        </select>
        <p className="form__error-paragraph smalltext__avenir">{inputError} </p>
    </div>
  )
}

export default Dropdown