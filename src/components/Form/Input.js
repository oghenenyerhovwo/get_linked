import React, { useState, useEffect } from 'react'
import "./input.css"

import {BiHide} from "react-icons/bi"
import {BiShow} from "react-icons/bi"
// 
// BiShow
const Input = props => {
    const {
        type,
        value,
        onChange,
        name,
        label,
        trim,
        error,
        placeholder,
        disabled,
        required,
        description,
        // hideNumberArrow,
    } = props

const [showIcon, setShowIcon] = useState(false)
const [inputType, setInputType] = useState("")
const [inputError, setInputError] = useState()

useEffect(() => {
    setInputType(type)
}, [type])

useEffect(() => {
    setInputError(error)
}, [error])

const handleIcon = () => {
    if(!showIcon){
        setInputType("text")
    } else{
        setInputType("password")
    }
    setShowIcon(prevState => !prevState )
    
}

  return (
    <div className={`app_input spacing-sm ${error && "form__error"} app_input-number`}>
        <div className="spacing-xs form__label">
            <label>{label} <span className="icon_required">{label && required && "*"} </span> <span className="not_required">{label && !required && ""} </span></label>
        </div>
        <p className="spacing-xs form_description">{description} </p> 
        <input
            onChange={onChange}
            value={trim ? value.trim() : value}
            type={inputType}
            name={name}
            placeholder={placeholder}
            disabled={disabled}
            className="form__field"
        />
        {
            type === "password" && (
                <div className="app_input-password flex flex__center">
                    { !showIcon ? <BiShow onClick={handleIcon} /> : <BiHide onClick={handleIcon} />}
                </div>
            )
        }
        <p className="form__error-paragraph">{inputError} </p>
    </div>
  )
}

export default Input