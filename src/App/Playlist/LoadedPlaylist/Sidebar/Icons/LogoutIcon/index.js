import React from 'react'
import { ReactComponent as LogoutIcon } from './logout.svg'
import './Logout.scss'

const Logout = () => (
  <div className='logout-icon-container'>
    <LogoutIcon className='logout-icon' />
  </div>
)

export default Logout
