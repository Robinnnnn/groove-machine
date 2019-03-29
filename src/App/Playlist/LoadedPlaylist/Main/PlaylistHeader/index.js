import React from 'react'
import PropTypes from 'prop-types'
import { msToTimestamp } from 'util/index'
import './PlaylistHeader.scss'

const PlaylistHeader = ({ playlist }) => {
  const duration = msToTimestamp(
    playlist.tracks.items.reduce((d, i) => d + i.track.duration_ms, 0)
  )
  const shouldDisplayAuthor = isNaN(playlist.owner.display_name)

  return (
    <div className='playlist-header-container'>
      <p className='title'>{playlist.name}</p>
      <div className='subtitle-container'>
        <p className='description'>{playlist.description}</p>
        {shouldDisplayAuthor ? (
          <>
            <div className='dot' />
            <a
              className='author'
              href={playlist.owner.external_urls.spotify}
              target='_blank'
              rel='noopener noreferrer'
            >
              {playlist.owner.display_name}
            </a>
          </>
        ) : null}
      </div>
      <div className='stats-container'>
        <p className='tracks'>Tracks: {playlist.tracks.total}</p>
        <p className='followers'>Followers: {playlist.followers.total}</p>
        <p className='duration'>Duration: {duration}</p>
      </div>
    </div>
  )
}

PlaylistHeader.propTypes = {
  playlist: PropTypes.shape({}).isRequired
}

export default PlaylistHeader
