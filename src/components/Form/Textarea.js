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
    } = props

    const [inputError, setInputError] = useState()

    useEffect(() => {
        setInputError(error)
    }, [error])

  return (
    <div className={`app__textarea spacing-md ${error && "form__error"}`}>
        <label className="form__label spacing-sm">{label} <span className="icon_required">{label && required && "*"} </span> <span className="not_required">{label && !required && "(optional)"} </span></label>
        <div className="spacing-sm"> </div>
        <p className="form_description">{description} </p> 
        <div className="spacing-sm"> </div>
        <textarea
            className="app__textarea-field form__field"
            onChange={onChange}
            value={trim ? value.trim() : value}
            name={name}
            placeholder={placeholder}    
        ></textarea>
        <p className="form__error-paragraph smalltext__avenir">{inputError} </p>
    </div>
  )
}

export default Textarea