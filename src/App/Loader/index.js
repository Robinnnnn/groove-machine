import React from 'react'
import displayRandomSillyExcuseWhileUserWaits from './sillyExcuses'
import './Loader.scss'

const Loader = ({ message }) => (
  <div className='loader-container'>
    <div className='loader-bar' role='progressbar'>
      <div className='animated-band top-band' />
      <div className='loader-message'>
        {message || displayRandomSillyExcuseWhileUserWaits()}...
      </div>
      <div className='animated-band bottom-band' />
    </div>
  </div>
)

export default Loader
