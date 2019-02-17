import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AlbumCover from './AlbumCover';
import ProgressBar from './ProgressBar'
import './TrackContainer.scss'
import MainInfo from './MainInfo';

class TrackContainer extends Component {
  static propTypes = {
    track: PropTypes.shape({}).isRequired
  }

  state = {
    isHovering: false
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

  circleAction = (e) => {
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
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onClick={this.playTrack}
      >

        <div
          className='the-circle'
          onClick={this.circleAction}
        />

        <AlbumCover
          imgUrl={track.album.images[1].url}
          hoverClass={hoverClass}
          activeClass={activeClass}
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
