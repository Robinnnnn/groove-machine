import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './MediaPlayer.scss'
import { msToMinutesAndSeconds } from '../util';
import Controls from './Controls';

class MediaPlayer extends Component {
  static propTypes = {
    spotify: PropTypes.shape({}).isRequired
  }

  state = {
    playback: null,
    displayControls: false
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.determineControlsDisplay)
  }

  determineControlsDisplay = (e) => {
    let displayControls = false
    if (window.innerHeight - e.clientY < 150) displayControls = true
    if (displayControls !== this.state.displayControls) this.setState({ displayControls })
  }

  render() {
    const { displayControls } = this.state
    const { playback, spotify } = this.props
    const track = playback && playback.item
    const displayClass = displayControls ? 'displayed' : 'hidden'
    return (
      <div className={`media-player-container media-player-${displayClass}`}>
        {
          playback
            ? <div className='media-player-info-container'>
                <div className='metadata-container'>
                  <div className='album-cover-container'>
                    <img
                      className='album-cover'
                      src={track.album.images[2].url}
                      alt='cover'
                    />
                  </div>
                  <div className='track-title-artist-container'>
                    <div className='track-title-container'>
                      <p className='track-title'>{track.name}</p>
                    </div>
                    <div className='track-artist-container'>
                      <p className='track-artist'>
                        {
                          track.artists.slice(0, 2)
                            .map(({ name }) => name)
                            .join(' & ')
                        }
                      </p>
                    </div>
                  </div>
                </div>
                
                <Controls
                  isPlaying={playback.is_playing}
                  progressMs={playback.progress_ms}
                  play={spotify.play}
                  pause={spotify.pause}
                  seek={spotify.seek}
                  previous={spotify.skipToPrevious}
                  next={spotify.skipToNext}
                />

                <div className='live-playback-container'>
                  <div className='progress-duration-timestamp-container'>
                    <div className='timestamp'>{msToMinutesAndSeconds(playback.progress_ms)}</div>
                  </div>
                  <hr />
                  <div className='total-duration-timestamp-container'>
                    <div className='timestamp'>{msToMinutesAndSeconds(track.duration_ms)}</div>
                  </div>
                </div>
              </div>
          : <div className='media-player-loading-container'>
            Loading...
          </div>
        }
      </div>
    )
  }
}

export default MediaPlayer
