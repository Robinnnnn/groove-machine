import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { SpotifyContext } from 'Contexts/index'
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
    isPlaying: PropTypes.bool.isRequired,
    progressMs: PropTypes.number,
    contributor: PropTypes.string.isRequired,
    overrideActiveTrack: PropTypes.func.isRequired,
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
    const { isPlaying, animatedLoadComplete } = this.props
    const { dispatch } = this.context
    if (!registeredCurrentlyPlayingTrack && isPlaying && animatedLoadComplete) {
      console.log('NOW PLAYING', this.props.track.name)
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

  playTrack = () => {
    const { track, playlistUri, play, overrideActiveTrack } = this.props

    overrideActiveTrack(track)

    const options = {
      context_uri: playlistUri,
      offset: {
        uri: track.uri
      }
    }
    return play(options)
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
    const { track, isPlaying, progressMs, contributor } = this.props

    const hoverClass = isHovering ? 'track-hover' : ''
    const activeClass = isPlaying ? 'track-active' : ''
    const revealClass = isHovering || isPlaying ? 'reveal-track-details' : ''

    return (
      <div
        className={`track-container ${revealClass} ${activeClass}`}
        ref={t => (this.track = t)}
        onClick={this.playTrack}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <div className='the-circle' onClick={this.getSongLyrics} />

        <AlbumCover
          imgUrl={track.album.images[1].url}
          hoverClass={hoverClass}
          activeClass={activeClass}
          openAlbum={this.openAlbum}
        />

        <MainInfo
          track={track}
          contributor={this.getContributor(contributor.id)}
          isPlaying={isPlaying}
          progressMs={progressMs}
        />

        {isPlaying && <ProgressBar progress={progressMs / track.duration_ms} />}
      </div>
    )
  }
}

export default TrackContainer
