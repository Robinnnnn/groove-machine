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
  sidebarLocked,
  toggleSidebarLock,
  logoutUser
}) => {
  const icons = [
    <Devices devicesActive={devicesActive} toggleDevices={toggleDevices} />,
    <Shuffle
      isShuffleActive={isShuffleActive}
      toggleSidebarShuffle={toggleShuffle}
    />,
    <Lock
      sidebarLocked={sidebarLocked}
      toggleSidebarLock={toggleSidebarLock}
    />,
    <Logout logout={logoutUser} />
  ]

  const onKeydown = e => {
    e.preventDefault()
    console.log(e.key)
    if (e.key === 'l') toggleSidebarLock()
    // if (e.key === ' ') togglePlayPause()
  }

  useEffect(() => {
    // Since we are identifying the callback function by name,
    // the event will not register multiple times
    document.addEventListener('keydown', onKeydown)
    return () => document.removeEventListener('keydown', onKeydown)
  })

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
