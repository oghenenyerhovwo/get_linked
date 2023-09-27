import React from 'react'

import "./checkbox.css"

const CheckBox = props => {
    
  const {
        label,
        checked,
        onChange,
        name,
    } = props
  
  return (
    <div className="spacing-xs">
        <div className="checkbox-wrapper-13">
        <input 
          id="c1-13" 
          checked={checked}
          value={checked}
          type="checkbox"
          onChange={onChange}
          name={name} 
        />
        <label className="checkbox__label" htmlFor="c1-13">{label}</label>
      </div>
    </div>
  )
}

export default CheckBox