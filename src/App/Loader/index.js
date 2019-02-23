import React from 'react'
import './Loader.scss'

const Loader = () => (
  <div className='loader-container'>
    <div className='loader-bar' role='progressbar'>
      <div className='animated-band top-band' />
      <div className='loader-message'>Yo</div>
      <div className='animated-band bottom-band' />
    </div>
  </div>
)

export default Loader