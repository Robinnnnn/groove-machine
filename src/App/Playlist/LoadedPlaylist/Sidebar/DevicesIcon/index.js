import React from 'react'
import { ReactComponent as DevicesIcon } from './devices.svg'
import './Devices.scss'

const Devices = ({ devicesActive, toggleDevices }) => {
  const iconClass = devicesActive ? 'active' : ''
  return (
    <div className='devices-icon-container' onClick={toggleDevices}>
      <DevicesIcon className={`devices-icon ${iconClass}`} />
    </div>
  )
}

export default Devices
