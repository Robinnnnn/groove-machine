import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { SpotifyContext } from '../Contexts/Spotify'
import Loader from '../Loader'
import PlaylistHeader from './PlaylistHeader'
import Tracklist from './Tracklist'
import MediaPlayer from './MediaPlayer'

class Playlist extends Component {
  static contextType = SpotifyContext

  static propTypes = {
    id: PropTypes.string.isRequired
  }

  state = {
    playlist: null,
    playback: null,
    retrievedPlayback: false,
    activeTrack: {},
    isOverriding: false
  }

  async componentDidMount() {
    const { state: { spotify } } = this.context
    const { id } = this.props

    // Frequently check for the latest playback state
    setInterval(() => this.getPlayback(spotify), 1000)

    const playlist = await this.getPlaylist(spotify, id)
    console.log('retrieved playlist data!', { playlist })

    this.setState({ spotify, playlist })
  }

  getPlayback = async spotify => {
    const playback = await spotify.getMyCurrentPlaybackState()

    // Handles race condition where async call returns an outdated track
    const { activeTrack, isOverriding } = this.state
    if (isOverriding && activeTrack.id !== playback.item.id) return

    this.setState({
      playback,
      activeTrack: playback.item,
      isOverriding: false,
      retrievedPlayback: true
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
    const { state: { spotify } } = this.context
    const { playlist, playback, retrievedPlayback, activeTrack } = this.state

    const loaded = playlist && retrievedPlayback
    const currentTrackId = playlist && playlist.item && playback.item.id
    const progressMs = playback && playback.progress_ms

    return (
      <div className='playlist-container'>
        {
          loaded 
            ? <>
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
            : <Loader />
        }
      </div>
    )
  }
}

export default Playlist
