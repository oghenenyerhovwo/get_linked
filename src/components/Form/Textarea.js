import React, { useState,  useEffect} from 'react'
import "./textarea.css"


const Textarea = props => {
    const {
        value,
        onChange,
        name,
        label,
        trim,
        error,
        placeholder,
        required,
        description,
        disabled,
    } = props

    const [inputError, setInputError] = useState()

    useEffect(() => {
        setInputError(error)
    }, [error])

  return (
    <div className={`app__textarea spacing-md ${error && "form__error"}`}>
        <div className="spacing-xs form__label">
            <label>{label} <span className="icon_required">{label && required && "*"} </span> <span className="not_required">{label && !required && ""} </span></label>
        </div>
        <p className="spacing-xs form_description">{description} </p> 
            
        <textarea
            onChange={onChange}
            value={trim ? value.trim() : value}
            name={name}
            placeholder={placeholder}
            disabled={disabled}   
            type="text"
            className="form__field"
        ></textarea>
        <p className="form__error-paragraph">{inputError} </p>
    </div>
  )
}

export default Textarea