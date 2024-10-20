import React from 'react'
import { useParams } from 'react-router-dom'

const ThankYouPage = () => {
    const {productName}=useParams()
    
  return (
    <div className='thank-you'>
        <h2>Thank You!</h2>
        <p>Thank you for your interest in {productName}!</p>
    </div>
  )
}

export default ThankYouPage