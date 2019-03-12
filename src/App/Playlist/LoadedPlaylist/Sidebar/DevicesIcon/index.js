import React, { useState } from 'react'
import { ReactComponent as DevicesIcon } from './devices.svg'
import './Devices.scss'

const Devices = ({ devices, selectDevice }) => {
  const [devicesIconActive, toggleDevicesIcon] = useState(false)

  console.log(devices)

  const iconClass = devicesIconActive ? 'active' : ''

  return (
    <div
      className='devices-icon-container'
      onClick={() => toggleDevicesIcon(!devicesIconActive)}
    >
      <DevicesIcon className={`devices-icon ${iconClass}`} />
    </div>
  )
}

export default Devices
