import React, { useState } from 'react'
import { ReactComponent as ShuffleIcon } from './shuffle.svg'
import './Shuffle.scss'

const Shuffle = ({ isShuffleActive, toggleSidebarShuffle }) => {
  const [shuffleActive, toggleShuffleIcon] = useState(isShuffleActive)

  const toggleShuffle = () => {
    toggleShuffleIcon(!shuffleActive)
    toggleSidebarShuffle(!shuffleActive)
  }

  const iconClass = shuffleActive ? 'active' : ''

  return (
    <div
      className='icon-content shuffle-icon-container'
      onClick={toggleShuffle}
    >
      <ShuffleIcon className={`icon shuffle-icon ${iconClass}`} />
    </div>
  )
}

export default Shuffle
