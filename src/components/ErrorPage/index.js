import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div>
        <p>Oops!, something went wrong when loading data or this page no longer exists</p>
        <p>Go to  <Link to="/">Home</Link> page</p>
    </div>
  )
}

export default ErrorPage