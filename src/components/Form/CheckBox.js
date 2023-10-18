import React from 'react'

import "./checkbox.css"

const CheckBox = props => {
    
  const {
        label,
        checked,
        onChange,
        name,
        disabled,
        error,
    } = props
  
  return (
    <div className={`spacing-sm ${error && "checkbox_error"}`}>
        <div className="checkbox-wrapper-13">
        
        <input 
          id="c1-13" 
          checked={checked}
          value={checked}
          type="checkbox"
          onChange={onChange}
          name={name} 
          disabled={disabled}
        />

        <div className="spacing-xs form__label checkbox__label">
          <label>{label}</label>
        </div>
      </div>
    </div>
  )
}

export default CheckBox