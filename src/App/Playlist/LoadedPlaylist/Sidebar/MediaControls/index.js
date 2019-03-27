import React from 'react'
import PropTypes from 'prop-types'
import { ReactComponent as BackLogo } from './icons/up2.svg'
import { ReactComponent as NextLogo } from './icons/down2.svg'
import { ReactComponent as PlayLogo } from './icons/play2.svg'
import { ReactComponent as PauseLogo } from './icons/pause2.svg'
import './Controls.scss'

const Controls = ({
  playlist,
  isPlaying,
  isShuffleActive,
  currentTrackID,
  progressMs,
  controller
}) => {
  const tracks = playlist.tracks.items
  const currentTrackIndex = playlist.tracks.items.findIndex(
    t => t.track.id === currentTrackID
  )

  const handleSkip = async action => {
    // If the player is not in shuffle mode, we can reliably update the UI right away
    if (!isShuffleActive) {
      controller[action]()
      const nextIndex = currentTrackIndex + (action === 'next' ? 1 : -1)
      const { track: nextTrack } = tracks.find((_, i) => i === nextIndex)
      return controller.overrideUIActiveTrack(nextTrack)
    }

    // Otherwise, we need to immediately start polling for the next track data as
    // Spotify has not provided a Queue API (as of March 2019), and update the UI
    // once we detect a change.
    // https://github.com/spotify/web-api/issues/462
    await controller[action]()
    const _id = setInterval(async () => {
      const nextTrack = await controller.getCurrentTrackFromServer()
      const nextTrackID = nextTrack.item.id
      if (nextTrackID !== currentTrackID) {
        const nextItem = tracks.find(t => t.track.id === nextTrackID)
        controller.overrideUIActiveTrack(nextItem.track)
        clearInterval(_id)
      }
    }, 100)
  }

  const handlePrevious = () => handleSkip('previous')

  const handleNext = () => handleSkip('next')

  const play = () => {
    controller.overrideUIPlaying()
    controller.play()
  }

  const pause = () => {
    controller.overrideUIPaused()
    controller.pause()
  }

  const togglePlayPause = () => {
    if (isPlaying) return pause()
    return play()
  }

  const playButtonClass = isPlaying ? 'pressed' : ''

  return (
    <div className='controls-container'>
      <div className='previous-container'>
        <BackLogo
          // NOTE : seek feature has a delayed UI response, just use handlePrevious for now
          // onClick={() => (progressMs > 3000 ? seek(0) : handlePrevious())}
          onClick={handlePrevious}
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
        <NextLogo onClick={handleNext} className='next-icon' />
      </div>
    </div>
  )
}

Controls.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  progressMs: PropTypes.number.isRequired,
  controller: PropTypes.shape({
    play: PropTypes.func.isRequired,
    pause: PropTypes.func.isRequired,
    seek: PropTypes.func.isRequired,
    previous: PropTypes.func.isRequired,
    next: PropTypes.func.isRequired,

    overrideUIPlaying: PropTypes.func.isRequired,
    overrideUIPaused: PropTypes.func.isRequired,
    overrideUIActiveTrack: PropTypes.func.isRequired,
    getCurrentTrackFromServer: PropTypes.func.isRequired
  }).isRequired
}

export default Controls
