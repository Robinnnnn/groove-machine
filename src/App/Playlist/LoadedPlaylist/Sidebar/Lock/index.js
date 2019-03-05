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
    <div className='lock-icon-container' onClick={toggleLock}>
      {locked ? (
        <LockedIcon className='unlocked-icon' />
      ) : (
        <UnlockedIcon className='unlocked-icon' />
      )}
    </div>
  )
}

export default Lock
