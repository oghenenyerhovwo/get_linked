import React, { useState, useEffect, useRef } from 'react'

import "./dropdown.css"

// BiShow
const Dropdown = props => {
    const {
        value,
        onChange,
        label,
        error,
        placeholder,
        disabled,
        required,
        description,
        options,
        name,
    } = props

    const dropdownMenuRef = useRef(null)
    const [inputError, setInputError] = useState()
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOptions, setDropdownOptions] = useState([]);

    const closeMenuWhenClickOutside = e => {
        if(dropdownMenuRef.current && isOpen && !dropdownMenuRef.current.contains(e.target)){
            setIsOpen(false)
        }
    }  

    useEffect(() => {
        const rootElement = document.getElementById("root")
        rootElement.addEventListener('mousedown', closeMenuWhenClickOutside)
        return () => {
          rootElement.removeEventListener('mousedown', closeMenuWhenClickOutside)
        };
    })

    useEffect(() => {
        setInputError(error)
    }, [error])

    useEffect(() => {
        const idOptions = []
        for (let index = 0; index < options.length; index++) {
            const option = options[index];
            idOptions[index] = {...option, _id: index + 1}           
        }
        setDropdownOptions(idOptions)
    }, [options])

    const handleOptionClick = (option) => {
        onChange(name, option);
        setIsOpen(false);
    };

    const handleDefaultClick = () => {
        onChange(name, "");
        setIsOpen(false);
    };

    return (
        <div className={`app__dropdown spacing-sm ${error && "form__error"}`}>
            <div className="spacing-xs form__label">
                <label>{label} <span className="icon_required">{label && required && "*"} </span> <span className="not_required">{label && !required && ""} </span></label>
            </div>
            <p className="spacing-xs form_description">{description} </p>

            <div className={`app__dropdown_custom ${disabled && "app__dropdown_custom-disabled_container"} ${isOpen ? 'open' : ''}`}>
                <div className={`app__dropdown_custom-button  ${value === "" ? 'app__dropdown_custom-button_default' : ''}`} onClick={() => setIsOpen(!isOpen)}>
                    {value || placeholder}
                </div>
                {isOpen && (
                    <div ref={dropdownMenuRef} className="app__dropdown_custom-options">
                        <div 
                            onClick={handleDefaultClick} 
                            className={`app__dropdown_custom-option ${value === "" ? 'app__dropdown_custom-option_default' : ''}`}
                        >
                            {placeholder}
                        </div>
                        {dropdownOptions && dropdownOptions.length > 0 && dropdownOptions.map(option => {
                            const handleSelection = () => handleOptionClick(option.value)
                            
                            return (
                                <div
                                    key={option._id}
                                    className={`app__dropdown_custom-option ${option === value ? 'selected' : ''}`}
                                    onClick={handleSelection}
                                >
                                    {option.label}
                                </div>
                            )
                        })}
                    </div>
                )}
                <div className={`${disabled && "app__dropdown_custom-disabled"}`}></div>
            </div>
            <p className="form__error-paragraph">{inputError} </p>
        </div>
    )
}

export default Dropdown