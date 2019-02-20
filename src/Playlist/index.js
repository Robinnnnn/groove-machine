import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PlaylistHeader from './PlaylistHeader'
import Tracklist from './Tracklist'
import MediaPlayer from './MediaPlayer'

class Playlist extends Component {
  state = {
    playlist: null,
    playback: null,
    activeTrack: {},
    isOverriding: false,
  }

  async componentDidMount() {
    const { spotify, playlistId } = this.props

    // Frequently check for the latest playback state
    setInterval(() => this.getPlayback(spotify), 1000)

    const playlist = await this.getPlaylist(spotify, playlistId)
    console.log({ playlist })

    this.setState({
      spotify,
      playlist
    })
  }

  getPlayback = async spotify => {
    const playback = await spotify.getMyCurrentPlaybackState()

    // Handles race condition where async call returns an outdated track
    const { activeTrack, isOverriding } = this.state
    if (isOverriding && activeTrack.id !== playback.item.id) return

    this.setState({
      playback,
      activeTrack: playback.item,
      isOverriding: false
    })
  }

  getPlaylist = async (spotify, playlistId) => await spotify.getPlaylist(playlistId)

  // Allows instant UI response for active track display;
  // otherwise there would be an ugly delay between track
  // selection and visual activation
  overrideActiveTrack = track => {
    const { playback } = this.state
    this.setState({
      playback: {
        ...playback,
        item: track,
        progress_ms: 0
      },
      activeTrack: track,
      isOverriding: true
    })
  }

  render() {
    const {
      spotify,
    } = this.props
    const {
      playlist,
      playback,
      activeTrack,
    } = this.state

    const loaded = playlist && playback
    const currentTrackId = playlist && playlist.item && playback.item.id
    const progressMs = playback && playback.progress_ms

    return (
      <div className='playlist-container'>
        {
          loaded && <>
            <PlaylistHeader playlist={playlist} />
            <Tracklist
              spotify={spotify}
              playlist={playlist}
              currentTrackId={currentTrackId || ''}
              activeTrack={activeTrack}
              progressMs={progressMs}
              overrideActiveTrack={this.overrideActiveTrack}
            />
            <MediaPlayer
              spotify={spotify}
              playback={playback}
            />
          </>
        }
      </div>
    )
  }
}

Playlist.propTypes = {
  spotify: PropTypes.shape({}).isRequired,
  playlistId: PropTypes.string.isRequired,
}

export default Playlist
