import React, { useState } from 'react'

import Form from "../Form"
import { stateApi, onChangeError } from "../../utils"

const Location = props => {
    
    const [lgaArray, setLgaArray] = useState([])
    const [lgaRestore, setLgaRestore] = useState(false)

    const {
        form,
        setForm,
        error,
        setError,
    } = props

    const handleState = e => {
        const {name,value} = e.target
        setForm({...form, lga: ""})
        setForm({...form, [name]: value})
        onChangeError(name, value, form, error, setError)

        setLgaArray([])
        setLgaRestore(true)
        // get the array of the selected category
        const selectedState = stateApi.filter(state => state.name === value)
        // if selected category was found
        if (selectedState.length > 0){
            setLgaArray(selectedState[0].content)
        }
      }
    
      const handleLga = e => {
        if(lgaRestore){
            setLgaRestore(false)
        }
        const {name,value} = e.target
        setForm({...form, [name]: value})
        onChangeError(name, value, form, error, setError)
      }


    return (
        <div>
           <Form.Dropdown 
                label="State"
                onChange={handleState}
                value={form.state}
                type="text"
                name="state"
                error={error.state}
                required={true}
                options={stateApi}
            />

            <Form.Dropdown 
                label="Local Government Area"
                onChange={handleLga}
                value={form.lga}
                type="text"
                name="lga"
                error={error.lga}
                required={true}
                options={lgaArray}
                restore={lgaRestore}
            />
        </div>
    )
}

export default Location