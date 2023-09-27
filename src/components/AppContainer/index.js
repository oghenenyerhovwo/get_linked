import React, { useEffect, useState } from "react"
import { useDispatch } from 'react-redux'

import LoadingBox from "../LoadingBox"

const AppContainer = (props) => {
    const dispatch = useDispatch()

    const [load, setLoad] = useState(true)

    useEffect(() => {
      let timer = setTimeout(()=> {
        setLoad(false)
        }
      ,3000)

      return () => {
        clearTimeout(timer)
      }
    }, [])

  return (
    <div>
      {
        load ? <LoadingBox /> : (
          <>
            {props.children}
          </>
        )
      }
    </div>
  )
}

export default AppContainer