import React, { useState } from 'react'
import { ReactComponent as LockedIcon } from './locked.svg'
import { ReactComponent as UnlockedIcon } from './unlocked.svg'
import './Lock.scss'

const Lock = ({ toggleSidebarLock }) => {
  const [locked, toggleLockIcon] = useState(false)

  const toggleLock = () => {
    toggleLockIcon(!locked)
    toggleSidebarLock()
  }

  return (
    <div className='icon-content lock-icon-container' onClick={toggleLock}>
      {locked ? (
        <LockedIcon className='icon lock-icon' />
      ) : (
        <UnlockedIcon className='icon unlocked-icon' />
      )}
    </div>
  )
}

export default Lock
