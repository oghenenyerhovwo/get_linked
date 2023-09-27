import React from 'react'
import Spinner from "../Spinner"
import MessageBox from "../Spinner"

const Button = (props) => {
    const {loading, error, success, errorMessage, successMessage} = props
    
    return (
        <>
            <div className="spacing-sm"> </div>
            <p className="form__error-paragraph">{errorMessage} </p>
            {
                loading ? <div className="flex flex__center"><Spinner /></div>:
                <>
                    <div className="spacing-sm">
                        {error && <MessageBox variant="danger">{errorMessage} </MessageBox>}
                        {success && <MessageBox variant="success">{successMessage}</MessageBox>}
                    </div>
                    <button type="submit">{props.children} </button>
                </>
                
            }
        </>
    )
}

export default Button