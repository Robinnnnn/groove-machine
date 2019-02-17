import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useTrail, animated } from 'react-spring'
import TrackContainer from './TrackContainer'
import './Tracklist.scss'

const Tracklist = ({
  spotify,
  playlist,
  currentTrackId,
  activeTrack,
  progressMs,
  overrideActiveTrack
}) => {
  const [mounted, set] = useState(false)
  const config = { mass: 5, tension: 2000, friction: 200 }

  // We only need to animate the first N elements visible in the user's viewport;
  // animating all of them at once can really screw with performance.
  // TODO1: This number should be calculated dynamically by dividing the device's
  // viewport height by the height of each list element. 
  const numVisibleAnimatedItems = 10

  const trail = useTrail(numVisibleAnimatedItems, {
    config,
    opacity: 1,
    x: 0,
    height: 140,
    from: { opacity: 0, x: 20, height: 0 },
    onRest: () => set(() => true)
  })

  return (
    <div className='tracklist-container'>
      {
        trail.map(({ x, height, ...rest }, index) => {
          const { track, added_by } = playlist.tracks.items[index]
          return (
            <animated.div
              key={track.id}
              className='animated-track-container'
              style={{
                ...rest,
                transform: x.interpolate(x => `translate3d(0,${x}px,0)`),
                height
              }}>
              <TrackContainer
                key={track.id}
                track={track}
                playlistUri={playlist.uri}
                play={spotify.play}
                isPlaying={track.id === currentTrackId || track.id === (activeTrack && activeTrack.id)}
                progressMs={progressMs}
                contributor={added_by.id === 'uplifted' ? 'R' : 'M'}
                overrideActiveTrack={overrideActiveTrack}
              />
            </animated.div>
          )
        })
      }
      {
        mounted && playlist.tracks.items.slice(numVisibleAnimatedItems).map(({ track, added_by }) => (
          <TrackContainer
            key={track.id}
            track={track}
            playlistUri={playlist.uri}
            play={spotify.play}
            isPlaying={track.id === currentTrackId || track.id === (activeTrack && activeTrack.id)}
            progressMs={progressMs}
            contributor={added_by.id === 'uplifted' ? 'R' : 'M'}
            overrideActiveTrack={overrideActiveTrack}
          />
        ))
      }
    </div>
  )
}

Tracklist.propTypes = {
  spotify: PropTypes.shape({}).isRequired,
  playlist: PropTypes.shape({}).isRequired,
  currentTrackId: PropTypes.string.isRequired,
  activeTrack: PropTypes.shape({}).isRequired,
  progressMs: PropTypes.number.isRequired,
  overrideActiveTrack: PropTypes.func.isRequired
}

export default Tracklist