import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useTrail, animated } from 'react-spring'
import TrackContainer from './TrackContainer'
import './Tracklist.scss'

const Tracklist = ({
  spotify,
  playlist,
  playback,
  currentTrackID,
  progressMs,
  overrideUIPaused,
  overrideUISelectedTrack,
  tracklistDisplacement
}) => {
  const [mounted, set] = useState(false)
  const config = { mass: 5, tension: 2000, friction: 200 }

  // We only need to animate the first N elements visible in the user's viewport;
  // animating all of them at once can really screw with performance.
  // TODO1: This number should be calculated dynamically by dividing the device's
  // viewport height by the height of each list element.
  const numVisibleAnimatedItems = Math.min(10, playlist.tracks.items.length)

  const trail = useTrail(numVisibleAnimatedItems, {
    config,
    opacity: 1,
    x: 0,
    height: 140,
    from: { opacity: 0, x: 20, height: 0 },
    onRest: () => set(() => true)
  })

  return (
    <div
      className='tracklist'
      style={{ transform: `translateX(${tracklistDisplacement}px)` }}
    >
      {trail.map(({ x, height, ...rest }, index) => {
        const { track, added_by } = playlist.tracks.items[index]
        const isSelected = track.id === currentTrackID
        const isPlaying = (isSelected && playback.is_playing) || false
        return (
          <animated.div
            key={track.id}
            className='animated-track-container'
            style={{
              ...rest,
              transform: x.interpolate(x => `translate3d(0,${x}px,0)`),
              height
            }}
          >
            <TrackContainer
              key={track.id}
              track={track}
              playlistUri={playlist.uri}
              isSelected={isSelected}
              isPlaying={isPlaying}
              progressMs={progressMs}
              contributor={added_by}
              play={spotify.play}
              pause={spotify.pause}
              overrideUIPaused={overrideUIPaused}
              overrideUISelectedTrack={overrideUISelectedTrack}
              animatedLoadComplete={mounted}
            />
          </animated.div>
        )
      })}
      {mounted &&
        playlist.tracks.items
          .slice(numVisibleAnimatedItems)
          .map(({ track, added_by }) => {
            const isSelected = track.id === currentTrackID
            const isPlaying = (isSelected && playback.is_playing) || false
            return (
              <TrackContainer
                key={track.id}
                track={track}
                playlistUri={playlist.uri}
                play={spotify.play}
                pause={spotify.pause}
                isSelected={isSelected}
                isPlaying={isPlaying}
                progressMs={progressMs}
                contributor={added_by}
                overrideUIPaused={overrideUIPaused}
                overrideUISelectedTrack={overrideUISelectedTrack}
                animatedLoadComplete={mounted}
              />
            )
          })}
    </div>
  )
}

Tracklist.propTypes = {
  spotify: PropTypes.shape({}).isRequired,
  currentTrackID: PropTypes.string.isRequired,
  progressMs: PropTypes.number.isRequired,
  overrideUISelectedTrack: PropTypes.func.isRequired
}

export default Tracklist
