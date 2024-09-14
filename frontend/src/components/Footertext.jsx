import React from 'react'

const Footertext = ({buttonText , Text}) => {
  return (
    <span className='justify-center  pt-3 text-sm font-serif text-black' >{Text}<button className='underline font-medium m-1'>{buttonText}</button></span>
  )
}

export default Footertext