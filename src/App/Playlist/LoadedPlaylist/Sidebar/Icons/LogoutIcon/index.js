import React from 'react'
import { ReactComponent as LogoutIcon } from './logout.svg'
import './Logout.scss'

const Logout = ({ logout }) => (
  <div className='icon-content logout-icon-container' onClick={logout}>
    <LogoutIcon className='icon logout-icon' />
  </div>
)

export default Logout
