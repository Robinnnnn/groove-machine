import React from 'react'
import PropTypes from 'prop-types'
import { ReactComponent as BackLogo } from './icons/back-thin.svg'
import { ReactComponent as NextLogo } from './icons/forward-thin.svg'
import { ReactComponent as PlayLogo } from './icons/play.svg'
import { ReactComponent as PauseLogo } from './icons/pause.svg'
import './Controls.scss'

const Controls = ({
  isPlaying,
  progressMs,
  play,
  pause,
  seek,
  previous,
  next
}) => (
  <div className='controls-container'>
    <div className='previous-container'>
      <BackLogo
        onClick={() => (progressMs > 3000 ? seek(0) : previous())}
        className='previous-icon'
      />
    </div>
    <div className='play-pause-container'>
      {isPlaying ? (
        <PauseLogo onClick={pause} className='pause-icon' />
      ) : (
        <PlayLogo onClick={play} className='play-icon' />
      )}
    </div>
    <div className='next-container'>
      <NextLogo onClick={next} className='next-icon' />
    </div>
  </div>
)

Controls.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  progressMs: PropTypes.number.isRequired,
  play: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  seek: PropTypes.func.isRequired,
  previous: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired
}

export default Controls
