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
  return (
    <div className='tracks-container'>
      {
        playlist.tracks.items.map(({ track, added_by }) => (
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