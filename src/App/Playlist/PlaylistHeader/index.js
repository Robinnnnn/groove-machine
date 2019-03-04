import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './PlaylistHeader.scss'

class PlaylistHeader extends Component {
  static propTypes = {
    playlist: PropTypes.shape({}).isRequired
  }

  render() {
    const { playlist } = this.props

    return (
      <div className='playlist-header-container'>
        <p className='title'>{playlist.name}</p>
        <p className='description'>{playlist.description}</p>
        <div className='stats-container'>
          <p className='tracks'>Tracks: {playlist.tracks.total}</p>
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
