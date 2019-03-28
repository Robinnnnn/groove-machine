import React from 'react'
import { ReactComponent as ShuffleIcon } from './shuffle.svg'
import './Shuffle.scss'

// TODO : the UI does not update automatically. there may have to be a
// `overrideShuffle` handler higher up the chain that produces immediate
// UI response
const Shuffle = ({ isShuffleActive, toggleShuffle, overrideUIShuffle }) => {
  const iconClass = isShuffleActive ? 'active' : ''
  const toggle = () => {
    toggleShuffle(!isShuffleActive)
    overrideUIShuffle()
  }
  return (
    <div className='icon-content shuffle-icon-container' onClick={toggle}>
      <ShuffleIcon className={`icon shuffle-icon ${iconClass}`} />
    </div>
  )
}

export default Shuffle
