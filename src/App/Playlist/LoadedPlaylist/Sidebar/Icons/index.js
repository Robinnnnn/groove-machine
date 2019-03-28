import React, { useEffect } from 'react'
import Devices from './DevicesIcon'
import Shuffle from './ShuffleIcon'
import Lock from './LockIcon'
import Logout from './LogoutIcon'
import './Icons.scss'

const Icons = ({
  devicesActive,
  toggleDevices,
  isShuffleActive,
  toggleShuffle,
  overrideUIShuffle,
  sidebarLocked,
  toggleSidebarLock,
  logoutUser
}) => {
  const icons = [
    <Devices devicesActive={devicesActive} toggleDevices={toggleDevices} />,
    <Shuffle
      isShuffleActive={isShuffleActive}
      toggleShuffle={toggleShuffle}
      overrideUIShuffle={overrideUIShuffle}
    />,
    <Lock
      sidebarLocked={sidebarLocked}
      toggleSidebarLock={toggleSidebarLock}
    />,
    <Logout logout={logoutUser} />
  ]

  return (
    <div className='icons-container'>
      {icons.map((icon, i) => (
        <div
          key={icon.key + i}
          className='icon-container'
          style={{
            position: 'absolute',
            bottom: `${50 * (icons.length - i) - 20}px`
          }}
        >
          {icon}
        </div>
      ))}
    </div>
  )
}

export default Icons
