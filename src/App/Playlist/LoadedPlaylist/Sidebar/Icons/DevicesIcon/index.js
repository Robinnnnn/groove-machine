import React from 'react'
import { ReactComponent as DevicesIcon } from './devices.svg'
import './Devices.scss'

const Devices = ({ devicesActive, toggleDevices }) => {
  const iconClass = devicesActive ? 'active' : ''
  return (
    <div
      className='icon-content devices-icon-container'
      onClick={toggleDevices}
    >
      <DevicesIcon className={`icon devices-icon ${iconClass}`} />
    </div>
  )
}

export default Devices
