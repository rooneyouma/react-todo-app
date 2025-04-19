import React from 'react'

const Button = ({text, onClick, color}) => {

  const btnStyles = {
    backgroundColor: color,
  }
  
  return (
    <button className='btn' onClick={onClick} style={btnStyles}>{text}</button>
  )
}



export default Button