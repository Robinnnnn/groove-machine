import React from 'react'
import PropTypes from 'prop-types'
import { ReactComponent as BackLogo } from './icons/up.svg'
import { ReactComponent as NextLogo } from './icons/down.svg'
import { ReactComponent as PlayLogo } from './icons/play.svg'
import { ReactComponent as PauseLogo } from './icons/pause.svg'
import './Controls.scss'

const Controls = ({
  currentTrackId,
  playlist,
  overrideActiveTrack,
  isPlaying,
  progressMs,
  play,
  pause,
  seek,
  previous,
  next
}) => {
  const tracks = playlist.tracks.items
  const currentTrackIndex = playlist.tracks.items.findIndex(
    t => t.track.id === currentTrackId
  )

  const playPrevious = () => {
    const previousItem = tracks.find((t, i) => i === currentTrackIndex - 1)
    overrideActiveTrack(previousItem.track)
    previous()
  }

  const playNext = () => {
    const nextItem = tracks.find((t, i) => i === currentTrackIndex + 1)
    overrideActiveTrack(nextItem.track)
    next()
  }

  const togglePlayPause = () => (isPlaying ? pause() : play())

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
  progressMs: PropTypes.number.isRequired,
  play: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  seek: PropTypes.func.isRequired,
  previous: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired
}

export default Controls
