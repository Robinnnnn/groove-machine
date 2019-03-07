import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { SpotifyContext } from 'Contexts/index'
import PageTitle from './PageTitle'
import Loader from 'Elements/Loader'
import LoadedPlaylist from './LoadedPlaylist'
import ActiveTrackSeeker from './ActiveTrackSeeker'
import getLoaderMessage from 'Elements/Loader/sillyExcuses'
// import MediaPlayer from './MediaPlayer'
import './Playlist.scss'

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
    const {
      state: { spotify }
    } = this.context
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
    const {
      state: { activeTrackNode }
    } = this.context
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
    const { playback: statePlayback, activeTrack, isOverriding } = this.state
    if (isOverriding && activeTrack.id !== playback.item.id) return
    if (isOverriding && statePlayback.is_playing !== playback.is_playing) return

    this.setState({
      playback,
      activeTrack: playback.item,
      isOverriding: false,
      retrievedPlayback: true
    })
  }

  getPlaylist = async (spotify, playlistId) =>
    await spotify.getPlaylist(playlistId)

  // Allows instant UI response for active track display;
  // otherwise there would be an ugly delay between track
  // selection and visual activation
  overrideActiveTrack = track => {
    const { playback } = this.state
    this.setState({
      playback: {
        ...playback,
        item: track,
        is_playing: true,
        progress_ms: 0
      },
      activeTrack: track,
      isOverriding: true
    })
  }

  instaPlay = () => {
    const { playback } = this.state
    this.setState({
      playback: {
        ...playback,
        is_playing: true
      },
      isOverriding: true
    })
  }

  instaPause = () => {
    const { playback } = this.state
    this.setState({
      playback: {
        ...playback,
        is_playing: false
      },
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
    const currentTrack = playback && playback.item
    const currentTrackId = currentTrack && currentTrack.id
    const currentTrackTitle = currentTrack && currentTrack.name
    const progressMs = playback && playback.progress_ms

    return (
      <div className='playlist-container'>
        <PageTitle title={currentTrackTitle} />

        {loaded ? (
          <>
            <LoadedPlaylist
              playlist={playlist}
              spotify={state.spotify}
              playback={playback}
              isShuffleActive={playback.shuffle_state}
              currentTrackId={currentTrackId || ''}
              activeTrack={activeTrack}
              progressMs={progressMs}
              markPlaying={this.instaPlay}
              markPaused={this.instaPause}
              overrideActiveTrack={this.overrideActiveTrack}
              activeTrackPosition={activeTrackPosition}
              locateActiveTrack={state.scrollToActiveTrack}
            />
            <ActiveTrackSeeker
              activeTrackPosition={activeTrackPosition}
              locateActiveTrack={state.scrollToActiveTrack}
            />
          </>
        ) : (
          <Loader message={loaderMessage} />
        )}
      </div>
    )
  }
}

export default Playlist
