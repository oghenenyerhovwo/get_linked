import React from 'react'

// importing components
import { Link } from 'react-router-dom'

const Button = props => {
    const {
        href,
        block,
        variant,
        children,
        onClick,
    } = props
  return (
    <Link className={`btn btn-${variant }  ${block && `flex flex__center btn-block` }`} onClick={onClick} to={href || "#"}><>{children} </></Link>
  )
}

export default Button