import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { SpotifyContext } from '../../../Contexts'
import AlbumCover from './AlbumCover';
import MainInfo from './MainInfo';
import ProgressBar from './ProgressBar'
import scroll from '@robinnnnn/scroll-to'
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
    animatedLoadComplete: PropTypes.bool.isRequired,
  }

  state = {
    isHovering: false,
    centeredOnScreen: false,

    registeredCurrentlyPlayingTrack: false
  }

  componentDidUpdate(prevProps) {
    this.handleCurrentlyPlayingTrack()
    this.handleTrackUnmount(prevProps)

    this.handleScrollToTrack()
  }

  handleCurrentlyPlayingTrack = () => {
    const { registeredCurrentlyPlayingTrack } = this.state
    const { isPlaying, animatedLoadComplete } = this.props
    const { dispatch } = this.context
    if (!registeredCurrentlyPlayingTrack && isPlaying && animatedLoadComplete) {
      this.setState({ registeredCurrentlyPlayingTrack: true })
      dispatch({ type: 'set_track_node', payload: this.track })
    }
  }

  handleTrackUnmount = (prevProps) => {
    if (prevProps.isPlaying && !this.props.isPlaying) {
      this.setState({ centeredOnScreen: false, registeredCurrentlyPlayingTrack: false })
    }
  }
  
  handleScrollToTrack = () => {
    const { centeredOnScreen } = this.state
    const { isPlaying, animatedLoadComplete } = this.props
    // We need to wait for all tracks to plaster onto the DOM, since the
    // document height dynamically increases as tracks beneath the viewport
    // are lazy-loaded. Not waiting will cause an inaccurate scroll position.
    if (!centeredOnScreen && isPlaying && animatedLoadComplete) {
      console.log('NOW PLAYING', this.props.track.name)
      this.setState({ centeredOnScreen: true })
      // Hard-coding a number here is super hacky, but it's otherwise very
      // difficult to determine when the "rest" of the tracks have mounted
      // post-animation.
      const estimatedMountTimeMs = 300
      setTimeout(this.scrollToThisTrack, estimatedMountTimeMs)
    }
  }

  scrollToThisTrack = () => {
    const bounds = this.track.getBoundingClientRect()
    const middle = window.scrollY + bounds.top - window.innerHeight / 2 + bounds.height / 2
    console.log(middle, bounds)
    const config = {
      duration: 2500,
      ease: 'inOutQuint',
      cancelOnUserScroll: true
    }
    // The `scroll-to` library doesn't seem to scroll to the middle accurately
    // window.scrollTo(0, middle) // accurate scroll
    scroll(0, middle, config) // inaccurate scroll, but with animation
  }

  onMouseEnter = () => this.setState({ isHovering: true })

  onMouseLeave = () => this.setState({ isHovering: false })

  playTrack = () => {
    const {
      track,
      playlistUri,
      play,
      overrideActiveTrack
    } = this.props

    overrideActiveTrack(track)

    const options = {
      context_uri: playlistUri,
      offset: {
        uri: track.uri
      }
    }
    return play(options)
  }

  openAlbum = (e) => {
    e.stopPropagation()
    const { track } = this.props
    window.open(track.album.external_urls.spotify, '_blank')
  }

  getSongLyrics = (e) => {
    e.stopPropagation()
    const { track } = this.props
    const q = [
      ...track.name.split(' '),
      ...track.artists[0].name.split(' '),
      'lyrics'
    ].join('+').toLowerCase()
    window.open(`https://google.com/search?q=${q}`, '_blank')
  }

  render() {
    const {
      isHovering
    } = this.state
    const {
      track,
      isPlaying,
      progressMs,
      contributor
    } = this.props

    const hoverClass = isHovering ? 'track-hover' : ''
    const activeClass = isPlaying ? 'track-active' : ''
    const revealClass = isHovering || isPlaying ? 'reveal-track-details' : ''

    return (
      <div
        className={`track-container ${revealClass} ${activeClass}`}
        ref={t => this.track = t}
        onClick={this.playTrack}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >

        <div
          className='the-circle'
          onClick={this.getSongLyrics}
        />

        <AlbumCover
          imgUrl={track.album.images[1].url}
          hoverClass={hoverClass}
          activeClass={activeClass}
          openAlbum={this.openAlbum}
        />

        <MainInfo
          track={track}
          contributor={contributor}
          isPlaying={isPlaying}
          progressMs={progressMs}
        />

        { isPlaying && <ProgressBar progress={progressMs / track.duration_ms} /> }

      </div>
    )
  }  
}

export default TrackContainer
