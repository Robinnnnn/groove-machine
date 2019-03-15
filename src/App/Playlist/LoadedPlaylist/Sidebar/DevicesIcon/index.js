import React, { useState } from 'react'
import { ReactComponent as DevicesIcon } from './devices.svg'
import './Devices.scss'

const Devices = ({ toggleDevices }) => {
  const [devicesIconActive, toggleDevicesIcon] = useState(false)

  const handleToggleDevices = () => {
    toggleDevices()
    toggleDevicesIcon(!devicesIconActive)
  }

  const iconClass = devicesIconActive ? 'active' : ''

  return (
    <div className='devices-icon-container' onClick={handleToggleDevices}>
      <DevicesIcon className={`devices-icon ${iconClass}`} />
    </div>
  )
}

export default Devices
