import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { SpotifyContext } from '../Contexts/Spotify'
import Loader from '../Loader'
import getLoaderMessage from '../Loader/sillyExcuses'
import PlaylistHeader from './PlaylistHeader'
import Tracklist from './Tracklist'
import ActiveTrackSeeker from './ActiveTrackSeeker'
// import MediaPlayer from './MediaPlayer'

class Playlist extends Component {
  static contextType = SpotifyContext

  static propTypes = {
    id: PropTypes.string.isRequired
  }

  state = {
    loaderMessage: '',
    playlist: null,
    playback: null,
    retrievedPlayback: false,
    activeTrack: {},
    activeTrackPosition: '',
    isOverriding: false
  }

  componentWillMount() {
    this.setState({ loaderMessage: getLoaderMessage() })
  }

  async componentDidMount() {
    const { state: { spotify } } = this.context
    const { id } = this.props

    window.addEventListener('scroll', this.determineViewContext)

    // Frequently check for the latest playback state
    setInterval(() => this.getPlayback(spotify), 1000)

    const playlist = await this.getPlaylist(spotify, id)
    console.log('retrieved playlist data!', { playlist })

    this.setState({ spotify, playlist })
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.determineViewContext)
  }

  determineViewContext = () => {
    const { state: { activeTrackNode } } = this.context
    if (activeTrackNode) {
      const bounds = activeTrackNode.getBoundingClientRect()
      let relativeTo = 'within'
      if (bounds.top > window.innerHeight) relativeTo = 'below'
      else if (bounds.bottom < 0) relativeTo = 'above'
      this.setState({ activeTrackPosition: `${relativeTo}_viewport` })
    }
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
    const { state } = this.context
    const {
      loaderMessage,
      playlist,
      playback,
      retrievedPlayback,
      activeTrack,
      activeTrackPosition
    } = this.state

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
                  spotify={state.spotify}
                  playlist={playlist}
                  currentTrackId={currentTrackId || ''}
                  activeTrack={activeTrack}
                  progressMs={progressMs}
                  overrideActiveTrack={this.overrideActiveTrack}
                />
                <ActiveTrackSeeker
                  activeTrackPosition={activeTrackPosition}
                  locateActiveTrack={state.scrollToActiveTrack}
                />
                {
                  // Temporary disable MediaPlayer until design is finalized.
                  // https://github.com/Robinnnnn/spotify-playlist-viewer/issues/14
                  // <MediaPlayer
                  //   spotify={spotify}
                  //   playback={playback}
                  // />
                }
              </>
            : <Loader message={loaderMessage} />
        }
      </div>
    )
  }
}

export default Playlist
