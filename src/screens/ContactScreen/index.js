import React, { useState } from 'react'

// objects, items and functions
import { 
  Form,
  MessageBox,
  Spinner,
} from "../../components"

// objects, items and functions
import { 
  linkedInIcon,
  facebookIcon,
  xIcon,
  instagramIcon,
} from "../../assets"
import { onChangeError, onSubmitError } from '../../utils/'

// import css
import styles from "./contact.module.css"

const ContactScreen = () => {
  const initialFormState = {
    teamsName: "",
    firstName: "",
    email: "",
    message: "",
  }
  const [form, setForm] = useState(initialFormState)
  const [error, setError] = useState(initialFormState)
  const [emptyFieldError, setEmptyFieldError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = e => {
        e.preventDefault()
        setEmptyFieldError("")
        setLoading(true)
        const {isError, errorObject} = onSubmitError(form, error)
        setError(errorObject)
        if(!isError){
          // dispatch(createListing(form))
          console.log(form)
          setLoading(false)
        } else{
          setEmptyFieldError("One or more required fields are empty")
          setLoading(false)
        }
    }

    const handleChange = e => {
      const {name,value} = e.target
      setForm({...form, [name]: value})
      setError(onChangeError(name, value, form, error, setError))
    }

  return (
    <div className={`${styles.contact}`}>
      <div className={`${styles.contact_container}`}>
        <div className={`${styles.contact_text_section_card_wrapper}`}> 
          <div className={`${styles.contact_text_section_card}`}>
            <h3 className={`spacing-md`}>
              <span>Questions or need assistance?</span>
              <span>Let us know about it</span>
            </h3>
            <p className={`spacing-md`}>
              Email us below to any question related 
              to our event
            </p>
            <form onSubmit={handleSubmit}>
              <Form.Input
                value={form.teamsName}
                onChange={handleChange}
                name={"teamsName"}
                error={error.teamsName}
                placeholder={"Team's Name"}
                type="text"
              />
              <Form.Input
                value={form.firstName}
                onChange={handleChange}
                name={"firstName"}
                error={error.firstName}
                placeholder={"First Name"}
                type="text"
              />
              <Form.Input
                value={form.email}
                onChange={handleChange}
                name={"email"}
                error={error.email}
                placeholder={"Email"}
                type="email"
              />
              <Form.Textarea
                value={form.message}
                onChange={handleChange}
                name={"message"}
                error={error.message}
                placeholder={"Message"}
              />
              <div className="spacing-sm"> 
                {emptyFieldError && <MessageBox variant="danger">{emptyFieldError} </MessageBox>}
              </div>
              <div className={`${styles.contact_text_section_card_button}`}>
                {
                  loading ? <Spinner /> : <button type="submit" className="register_button">Submit</button>
                }
              </div>
            </form>
          </div>
          </div>
        <div className={`${styles.contact_text_section_first}`}>
            <div className="spacing-md">
                <h3 className="spacing-sm">Get in touch</h3>
                <div className="spacing-sm">
                  <p>Contact</p>
                  <p>Information</p>
                </div>
                <div className="spacing-sm">
                  <p>27,Alara Street</p>
                  <p>Yaba 100012</p>
                  <p>Lagos State</p>
                </div>
                <div className="spacing-sm">
                  <p>Call Us : 07067981819</p>
                </div>
                <div>
                  <p>we are open from Monday-Friday</p>
                  <p>08:00am - 05:00pm</p>
                </div>
            </div>
            <div>
              <h4>Share on</h4>
              <div>
                <img src={instagramIcon} alt="instagramIcon" />
                <img src={xIcon} alt="xIcon" />
                <img src={facebookIcon} alt="facebookIcon" />
                <img src={linkedInIcon} alt="linkedInIcon" />
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ContactScreen