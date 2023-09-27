import { useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux"

const Identity = props => {
    const navigate = useNavigate()

    const { currentUser } = useSelector(state => state.userStore)

    useEffect(() => {
      if(!currentUser.identityVerification){
        navigate(`/identity_verification`)
      }
    }, [navigate, currentUser.identityVerification])

    return (
        <>
            {
              currentUser.identityVerification && (
                <>{props.children}</>
              ) 
            }
        </>
    )
}

export default Identity