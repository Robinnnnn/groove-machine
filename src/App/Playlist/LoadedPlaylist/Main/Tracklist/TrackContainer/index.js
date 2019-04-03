import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { SpotifyContext } from 'Contexts/index'
import { log } from 'util/index'
import AlbumCover from './AlbumCover'
import MainInfo from './MainInfo'
import ProgressBar from './ProgressBar'
import './TrackContainer.scss'

class TrackContainer extends Component {
  static contextType = SpotifyContext

  static propTypes = {
    track: PropTypes.shape({}).isRequired,
    playlistUri: PropTypes.string.isRequired,
    play: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    progressMs: PropTypes.number,
    contributor: PropTypes.string.isRequired,
    overrideUISelectedTrack: PropTypes.func.isRequired,
    animatedLoadComplete: PropTypes.bool.isRequired
  }

  state = {
    isHovering: false,
    registeredCurrentlyPlayingTrack: false
  }

  componentDidUpdate(prevProps) {
    this.handleCurrentlyPlayingTrack()
    this.handleTrackUnmount(prevProps)
  }

  handleCurrentlyPlayingTrack = () => {
    const { registeredCurrentlyPlayingTrack } = this.state
    const { track, isSelected, isPlaying, animatedLoadComplete } = this.props
    const { dispatch } = this.context
    if (
      !registeredCurrentlyPlayingTrack &&
      animatedLoadComplete &&
      (isSelected || isPlaying)
    ) {
      log(
        'trace',
        `now playing: ${track.name}`,
        `id: ${track.id}`,
        `artist: ${track.artists[0].name}`,
        `album: ${track.album.name}`
      )
      // Must register that the track is being played on this
      // component's state as to not overload SpotifyContext
      // with a stream of `dispatch` calls.
      this.setState({ registeredCurrentlyPlayingTrack: true })
      dispatch({ type: 'set_track_node', payload: this.track })
    }
  }

  handleTrackUnmount = prevProps => {
    if (prevProps.isPlaying && !this.props.isPlaying) {
      // This value needs to reset, in case the user returns
      // to this track (i.e., in case the song is dope)
      this.setState({ registeredCurrentlyPlayingTrack: false })
    }
  }

  onMouseEnter = () => this.setState({ isHovering: true })

  onMouseLeave = () => this.setState({ isHovering: false })

  handlePlayPause = () => {
    const {
      track,
      isSelected,
      isPlaying,
      progressMs,
      playlistUri,
      play,
      pause,
      overrideUIPaused,
      overrideUISelectedTrack
    } = this.props

    const shouldPlay = !isPlaying
    const shouldResume = isSelected && !isPlaying
    const playOptions = {
      context_uri: playlistUri,
      offset: { uri: track.uri }
    }

    if (shouldPlay) {
      overrideUISelectedTrack(track, shouldResume ? progressMs : 0)
      if (shouldResume) playOptions.position_ms = progressMs
      play(playOptions)
    } else {
      overrideUIPaused()
      pause()
    }
  }

  openAlbum = e => {
    e.stopPropagation()
    const { track } = this.props
    window.open(track.album.external_urls.spotify, '_blank')
  }

  getSongLyrics = e => {
    e.stopPropagation()
    const { track } = this.props
    const q = [
      ...track.name.split(' '),
      ...track.artists[0].name.split(' '),
      'lyrics'
    ]
      .join('+')
      .toLowerCase()
    window.open(`https://google.com/search?q=${q}`, '_blank')
  }

  getContributor = id => {
    switch (id) {
      case '125900943':
        return 'MW'
      case 'uplifted':
        return 'RK'
      case '1292416555':
        return 'GS'
      default:
        return ''
    }
  }

  render() {
    const { isHovering } = this.state
    const { track, isSelected, isPlaying, progressMs, contributor } = this.props

    const hoverClass = isHovering ? 'track-hover' : ''
    const pausedClass = isSelected && !isPlaying ? 'track-paused' : ''
    const activeClass = isPlaying ? 'track-active' : ''
    const revealClass = isHovering || isSelected ? 'reveal-track-details' : ''

    return (
      <div
        className={`track-container ${revealClass} ${activeClass} ${pausedClass}`}
        ref={t => (this.track = t)}
        onClick={this.handlePlayPause}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <div className='the-circle' onClick={this.getSongLyrics} />

        <AlbumCover
          imgUrl={track.album.images[1].url}
          hoverClass={hoverClass}
          pausedClass={pausedClass}
          activeClass={activeClass}
          openAlbum={this.openAlbum}
        />

        <MainInfo
          track={track}
          contributor={this.getContributor(contributor.id)}
          isSelected={isSelected}
          progressMs={progressMs}
        />

        {(isSelected || isPlaying) && (
          <ProgressBar progress={progressMs / track.duration_ms} />
        )}
      </div>
    )
  }
}

export default TrackContainer
