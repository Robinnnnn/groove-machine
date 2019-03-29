import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { msToTimestamp } from 'util/index'
import './PlaylistHeader.scss'

const PlaylistHeader = memo(({ playlist }) => {
  const duration = msToTimestamp(
    playlist.tracks.items.reduce((d, i) => d + i.track.duration_ms, 0)
  )
  const shouldDisplayAuthor = isNaN(playlist.owner.display_name)

  return (
    <div className='playlist-header-container'>
      <div className='content-container'>
        <div className='info-container'>
          <div className='title-container'>
            <a
              className='title'
              href={playlist.external_urls.spotify}
              target='_blank'
              rel='noopener noreferrer'
            >
              {playlist.name}
            </a>
          </div>
          <div className='subtitle-container'>
            <p className='description'>{playlist.description}</p>
          </div>
          <div className='stats-container'>
            <p className='tracks'>Tracks: {playlist.tracks.total}</p>
            <p className='followers'>Followers: {playlist.followers.total}</p>
            <p className='duration'>Duration: {duration}</p>
            {shouldDisplayAuthor ? (
              <p className='author'>
                Producer:{' '}
                <a
                  href={playlist.owner.external_urls.spotify}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {playlist.owner.display_name}
                </a>
              </p>
            ) : null}
          </div>
        </div>
        <div className='playlist-cover-container'>
          <a
            href={playlist.external_urls.spotify}
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              className='playlist-cover'
              src={playlist.images[0].url}
              alt='cover'
            />
          </a>
        </div>
      </div>
    </div>
  )
})

PlaylistHeader.propTypes = {
  playlist: PropTypes.shape({}).isRequired
}

export default PlaylistHeader
