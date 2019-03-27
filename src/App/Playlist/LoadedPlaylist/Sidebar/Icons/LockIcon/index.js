import React from 'react'
import { ReactComponent as LockedIcon } from './locked.svg'
import { ReactComponent as UnlockedIcon } from './unlocked.svg'
import './Lock.scss'

const Lock = ({ sidebarLocked, toggleSidebarLock }) => (
  <div className='icon-content lock-icon-container' onClick={toggleSidebarLock}>
    {sidebarLocked ? (
      <LockedIcon className='icon lock-icon' />
    ) : (
      <UnlockedIcon className='icon unlocked-icon' />
    )}
  </div>
)

export default Lock
