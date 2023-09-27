import { useGoogleLogin, GoogleLogin  } from '@react-oauth/google';
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { googleSignIn } from '../../actions/'

// css
import styles from "./google.module.css"

const GoogleAuth = props => {
  const dispatch = useDispatch()

  const [loading, setLoading]  = useState(false)
  const [errorMessage, setErrorMessage]  = useState(false)

  useEffect(() => {
    if(loading){
      setTimeout(() => {
        setErrorMessage("Timeout")
      }, 60000);
    } else {
      clearTimeout()
    }

    return () => {
      clearTimeout()
    };
  }, [loading, dispatch])

  const handleRequest = () => {
    setLoading(true)
  }

  const handleSuccess = credentialResponse => {
    dispatch(googleSignIn({token: credentialResponse.credential, type: "credential"}))
  }

  const handleFailure = error => {
    console.log(error);
    console.log(errorMessage)
    setErrorMessage( error.details || "An error occurred when logging in via google")
  }

  const login = useGoogleLogin({
    onSuccess: codeResponse => {
      dispatch(googleSignIn({token: codeResponse.access_token, type: "access_token"}))
    },
    onError: handleFailure,
  })

  return (
    <div onClick={handleRequest} className={`${styles.app_google_container}`}>
          {
            props.children ? (
              <div className={`${styles.app_google_btn_container}`} onClick={() => login()}>
                 {props.children}
                 <div className={`${styles.app_google_btn_invisible}`} >
                    <GoogleLogin
                        onSuccess={handleSuccess}
                        onError={handleFailure}
                        useOneTap
                    />
                 </div>
              </div>
            ) : (
              <GoogleLogin
                onSuccess={handleSuccess}
                onError={handleFailure}
                useOneTap
            />
            )
          }
    </div>
  )
}

export default GoogleAuth