import React from 'react'
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
  toggleSidebarLock
}) => {
  return (
    <div className='icons-container'>
      {[
        <Devices devicesActive={devicesActive} toggleDevices={toggleDevices} />,
        <Shuffle
          isShuffleActive={isShuffleActive}
          toggleSidebarShuffle={toggleShuffle}
        />,
        <Lock toggleSidebarLock={toggleSidebarLock} />,
        <Logout />
      ].map(i => (
        <div className='icon-container'>{i}</div>
      ))}
    </div>
  )
}

export default Icons
