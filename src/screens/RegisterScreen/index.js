import React, { useState, useEffect } from 'react'
import axios from "axios"

// objects, items and functions
import { 
  Form,
  MessageBox,
  Spinner,
  SuccessfulRegistration,
} from "../../components"

// objects, items and functions
import { 
  registerSVG,
  maleWalking,
  femaleWalking,
} from "../../assets"
import { onChangeError, onSubmitError, backend_url } from '../../utils/'

// import css
import styles from "./register.module.css"

const RegisterScreen = () => {
  const initialFormState = {
    teamsName: "",
    phone: "",
    email: "",
    projectTopic: "",
    category: "",
    groupSize: "",
  }
  const [form, setForm] = useState(initialFormState)
  const [error, setError] = useState(initialFormState)
  const [success, setSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [isAgree, setIsAgree] = useState(false)
  const [isAgreeError, setIsAgreeError] = useState(false)
  const [categoryList, setCategoryList] = useState([])

  useEffect(() => {
    axios
      .get(`${backend_url}/hackathon/categories-list`)
      .then(res => {
        const newCategoryList = res.data && res.data.length > 0 && res.data.map(item => {
          return {value: item.id, label: item.name}
        })
        setCategoryList(newCategoryList)
      })
      .catch(err => {
        console.log(err.response && err.response.data.message ? err.response.data.message : err.message)
      })
  }, [])

  const handleSubmit = async e => {
        try {
          e.preventDefault()
          setErrorMessage("")
          setLoading(true)
          const {isError, errorObject} = onSubmitError(form, error)
          setError(errorObject)
          if(!isError){
            if(isAgree){
              const formatForm = {
                email: form.email,
                phone_number: form.phone,
                team_name: form.teamsName,
                group_size: form.groupSize, 
                project_topic: form.projectTopic,
                category: form.category,
                privacy_poclicy_accepted: isAgree,
              }
              setIsAgreeError(false)
              const { data } = await axios.post(
                `${backend_url}/hackathon/registration`,
                formatForm,
              )
              if(data){
                setSuccess(true)
              } 
            } else {
              setIsAgreeError(true)
              setErrorMessage("Read through the terms and check if you agree")
            }
            setLoading(false)
          } else{
            setErrorMessage("One or more required fields are empty")
            setLoading(false)
          }
        } catch (error) {
          console.log(error)
          setLoading(false)
          setErrorMessage("Network error")
        }
    }

    const handleChange = e => {
      const {name,value} = e.target
      setForm({...form, [name]: value})
      setError(onChangeError(name, value, form, error, setError))
    }

    const handleDropdown = (name, value) => {
      setForm({...form, [name]: value})
      setError(onChangeError(name, value, form, error, setError))
    }

    const handleAgree = () => {
      setIsAgree(prevToggle => !prevToggle)
      setIsAgreeError(false)
    }

    return (
      <div className={`${styles.register}`}>
        <div className={`${styles.register_container}`}>
          <div className={`${styles.register_text_section_card_wrapper}`}> 
            <div className={`${styles.register_text_section_card}`}>
              <h3 className={`spacing-md`}>
                <span>Register</span>
              </h3>
              <div className={`spacing-sm ${styles.register_text_section_card_svg}`}>
                <img src={registerSVG} alt="registerSVG" />
              </div>
              <div className={`spacing-md ${styles.register_text_section_card_paragraph}`}>
                <p>
                  Be part of this movement!
                </p>
                <div>
                  <img src={femaleWalking} alt="femaleWalking" />
                  <img src={maleWalking} alt="maleWalking" />
                </div>
              </div>
              <h4 className="spacing-md">CREATE YOUR ACCOUNT</h4>
              <form onSubmit={handleSubmit}>
                <div className={`${styles.register_text_section_card_form_group}`}>
                  <Form.Input
                    value={form.teamsName}
                    onChange={handleChange}
                    name={"teamsName"}
                    error={error.teamsName}
                    placeholder={"Enter the name of your group"}
                    type="text"
                    label="Team's Name"
                  />
                  <Form.Input
                    value={form.phone}
                    onChange={handleChange}
                    name={"phone"}
                    error={error.phone}
                    placeholder={"Enter your phone number"}
                    type="number"
                    label="Phone"
                  />
                </div>
                <div className={`${styles.register_text_section_card_form_group}`}>
                  <Form.Input
                    value={form.email}
                    onChange={handleChange}
                    name={"email"}
                    error={error.email}
                    placeholder={"Enter your email address"}
                    type="email"
                    label="Email"
                  />
                  <Form.Input
                    value={form.projectTopic}
                    onChange={handleChange}
                    name={"projectTopic"}
                    error={error.projectTopic}
                    placeholder={"What is your project topic?"}
                    type="text"
                    label="Project Topic"
                  />
                </div>
                <div className={`${styles.register_text_section_card_form_group}`}>
                  <Form.Dropdown
                    value={form.category}
                    onChange={handleDropdown}
                    name={"category"}
                    error={error.category}
                    placeholder={"Select your category"}
                    label="Category"
                    options={categoryList}
                  />

                  <Form.Dropdown
                    value={form.groupSize}
                    onChange={handleDropdown}
                    name={"groupSize"}
                    error={error.groupSize}
                    placeholder={"Select your group size"}
                    label="Group size"
                    options={[
                      {value: "1", label: "1"},
                      {value: "2", label: "2"},
                      {value: "3", label: "3"},
                      {value: "4", label: "4"},
                      {value: "5", label: "5"},
                      {value: "6", label: "6"},
                      {value: "7", label: "7"},
                      {value: "8", label: "8"},
                      {value: "9", label: "9"},
                      {value: "10", label: "10"},
                      {value: "11", label: "1"},
                      {value: "12", label: "12"},
                      {value: "13", label: "13"},
                      {value: "14", label: "14"},
                      {value: "15", label: "15"},
                    ]}
                  />
                </div>
                <p className={`${styles.register_text_section_card_form_paragraph} spacing-sm`}>Please review your registration details before submitting</p>
                <div className={`${styles.register_text_section_card_form_check} spacing-sm`}>
                  <Form.CheckBox 
                    checked={isAgree}
                    onChange={handleAgree}
                    name="agree"
                    error={isAgreeError}
                  />
                  <p className="spacing-sm">I agreed with the event terms and conditions and privacy policy</p>
                </div>
                <div className="spacing-sm"> 
                  {errorMessage && <MessageBox variant="danger">{errorMessage} </MessageBox>}
                </div>
                <div className={`${styles.register_text_section_card_button}`}>
                  {
                    loading ? <Spinner /> : 
                      <button type="submit" className="register_button">
                        <span className={`${styles.button_text_smallscreen}`}>Submit</span>
                        <span className={`${styles.button_text_bigscreen}`}>Register Now</span>
                      </button>
                  }
                </div>
              </form>
            </div>
            </div>
          <div className={`${styles.register_img_section}`}>
              <img src={registerSVG} alt="registerSVG" />
          </div>
        </div>
        <SuccessfulRegistration success={success} />
      </div>
    )
}

export default RegisterScreen