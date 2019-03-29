import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { msToTimestamp } from 'util/index'
import './PlaylistHeader.scss'

class PlaylistHeader extends PureComponent {
  static propTypes = {
    playlist: PropTypes.shape({}).isRequired
  }

  render() {
    const { playlist } = this.props
    const duration = msToTimestamp(
      playlist.tracks.items.reduce((d, i) => d + i.track.duration_ms, 0)
    )

    return (
      <div className='playlist-header-container'>
        <p className='title'>{playlist.name}</p>
        <div className='subtitle-container'>
          <p className='description'>{playlist.description}</p>
          <div className='dot' />
          <p className='author'>{playlist.owner.display_name}</p>
        </div>
        <div className='stats-container'>
          <p className='tracks'>Tracks: {playlist.tracks.total}</p>
          <p className='duration'>Duration: {duration}</p>
          <p className='followers'>Followers: {playlist.followers.total}</p>
        </div>

        {
          // <p className='signature'>Max & Robin, 2019</p>
        }
        {
          // <pre>{JSON.stringify(playlist, null, 2)}</pre>
        }
      </div>
    )
  }
}

export default PlaylistHeader
