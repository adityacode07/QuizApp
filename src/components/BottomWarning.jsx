import React from 'react'
import { Link } from "react-router-dom"

const BottomWarning = ({label,buttonText, to}) => {
  return (
    <div className='font-medium text-sm'>
      {label}
      <Link className="underline pl-1 cursor-pointer" to={to}>
      {buttonText}
      </Link>
    </div>
  )
}

export default BottomWarning
