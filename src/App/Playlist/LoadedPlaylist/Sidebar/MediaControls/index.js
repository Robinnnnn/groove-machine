import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Controls from './Controls'
import './Controls.scss'

const ControlsContainer = ({
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

  const togglePlayPause = () => {
    if (isPlaying) {
      controller.overrideUIPaused()
      controller.pause()
      return
    }
    controller.overrideUIPlaying()
    controller.play()
  }

  const onKeydown = e => {
    if (e.key === ' ') {
      e.preventDefault()
      togglePlayPause()
    }
    if (e.metaKey) {
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        handlePrevious()
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        handleNext()
      }
    }
  }

  useEffect(() => {
    // Since we are identifying the callback function by name,
    // the event will not register multiple times
    document.addEventListener('keydown', onKeydown)
    return () => document.removeEventListener('keydown', onKeydown)
  })

  return (
    <Controls
      isPlaying={isPlaying}
      togglePlayPause={togglePlayPause}
      playPrevious={handlePrevious}
      playNext={handleNext}
    />
  )
}

ControlsContainer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  progressMs: PropTypes.number.isRequired,
  controller: PropTypes.shape({
    play: PropTypes.func.isRequired,
    pause: PropTypes.func.isRequired,
    seek: PropTypes.func.isRequired,
    previous: PropTypes.func.isRequired,
    next: PropTypes.func.isRequired,
    getCurrentTrackFromServer: PropTypes.func.isRequired,
    overrideUIPlaying: PropTypes.func.isRequired,
    overrideUIPaused: PropTypes.func.isRequired,
    overrideUIActiveTrack: PropTypes.func.isRequired
  }).isRequired
}

export default ControlsContainer
