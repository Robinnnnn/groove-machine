import React from 'react'
import PropTypes from 'prop-types'
import { msToMinutesAndSeconds } from '../../../../../../util'
import './MainInfo.scss'

const MainInfo = ({ track, contributor, isPlaying, progressMs }) => (
  <div className='track-info-container'>
    <div className='track-artist-title-container'>
      <div className='track-title-container'>
        <p className='track-title'>{track.name}</p>
      </div>

      <div className='track-artist-container'>
        <p className='track-artist'>
          {track.artists
            .slice(0, 2)
            .map(({ name }) => name)
            .join(' & ')}
        </p>
      </div>

      <div className='track-album-container'>
        <p className='track-album-name'>
          {track.album.album_type === 'single' ? 'Single' : track.album.name}
        </p>
        <p>—</p>
        <p className='track-album-year'>
          {track.album.release_date.slice(0, 4)}
        </p>
      </div>
    </div>

    <div className='track-contributor-container'>
      <p className='track-contributor'>{contributor}</p>
    </div>

    <div className='track-duration-container'>
      <p className='duration'>
        {msToMinutesAndSeconds(
          isPlaying ? track.duration_ms - progressMs : track.duration_ms
        )}
      </p>
    </div>
  </div>
)

MainInfo.propTypes = {
  track: PropTypes.shape({}).isRequired,
  contributor: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  progressMs: PropTypes.number.isRequired
}

export default MainInfo
