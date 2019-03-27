import React from 'react'
import PropTypes from 'prop-types'
import { ReactComponent as BackLogo } from './icons/up2.svg'
import { ReactComponent as NextLogo } from './icons/down2.svg'
import { ReactComponent as PlayLogo } from './icons/play2.svg'
import { ReactComponent as PauseLogo } from './icons/pause2.svg'

const Controls = ({ isPlaying, togglePlayPause, playPrevious, playNext }) => {
  const playButtonClass = isPlaying ? 'pressed' : ''

  return (
    <div className='controls-container'>
      <div className='previous-container'>
        <BackLogo
          // NOTE : seek feature has a delayed UI response, just use playPrevious for now
          // onClick={() => (progressMs > 3000 ? seek(0) : playPrevious())}
          onClick={playPrevious}
          className='previous-icon'
        />
      </div>
      <div
        className={`play-pause-container ${playButtonClass}`}
        onClick={togglePlayPause}
      >
        {isPlaying ? (
          <PauseLogo className='pause-icon' />
        ) : (
          <PlayLogo className='play-icon' />
        )}
      </div>
      <div className='next-container'>
        <NextLogo onClick={playNext} className='next-icon' />
      </div>
    </div>
  )
}

Controls.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  togglePlayPause: PropTypes.func.isRequired,
  playPrevious: PropTypes.func.isRequired,
  playNext: PropTypes.func.isRequired
}

export default Controls
