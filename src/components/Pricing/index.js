import React from 'react'

// component
import Form from "../Form"

// functions 
import { onChangeError } from '../../utils/'

// css
import "./style.css"

const Pricing = (props) => {

    const {label, required, form, setForm, setError, error, utils } = props

    const handleChange = e => {
        const {name,value} = e.target
        setForm({...form, [name]: value})
        onChangeError(name, value, form, error, setError)
    }

    return (
        <div className="app__pricing grid">
            <p className="app__pricing-label smalltext__avenir">{label} <span className="danger">{required && "*"} </span> </p>
            <div className="app__pricing-price">
                <Form.Input 
                    onChange={handleChange}
                    value={form.price}
                    type="number"
                    name="price"
                    error={error.price}
                    required={true}
                />
            </div>
            <div className="app__pricing-duration">
                <Form.Dropdown 
                    onChange={handleChange}
                    value={form.priceDuration}
                    type="number"
                    name="priceDuration"
                    error={error.priceDuration}
                    options={utils.priceDuration}
                    required={true}
              />
            </div>
        </div>
    )
}

export default Pricing