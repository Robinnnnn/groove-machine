import React from 'react'
import PropTypes from 'prop-types'
import './ProgressBar.scss'

class ProgressBar extends React.Component {
  static propTypes = {
    duration: PropTypes.number.isRequired,
    progress: PropTypes.number.isRequired,
    seek: PropTypes.func.isRequired
  }

  state = {
    width: 0,
    leftOffset: 0,
    seekPositionPercent: 0,
    isSeekingBehind: false
  }

  componentDidMount() {
    // Hacky, but needed for accurate bounds calculation
    setTimeout(() => {
      const bounds = this.container.getBoundingClientRect()
      const width = bounds.width
      const leftOffset = bounds.left
      this.setState({ width, leftOffset })
    }, 1000)
  }

  handleSeekPosition = e => {
    const { progress } = this.props
    const { width, leftOffset } = this.state
    const seekPositionPixels = e.pageX - leftOffset
    const seekPositionPercent = Math.min(seekPositionPixels / width, 1)
    const isSeekingBehind = seekPositionPercent < progress
    this.setState({
      seekPositionPercent,
      isSeekingBehind
    })
  }

  handleSeekTo = e => {
    e.stopPropagation()
    const { duration, seek } = this.props
    const { seekPositionPercent } = this.state
    const seekToMs = Math.round(duration * seekPositionPercent)
    seek(seekToMs)
  }

  handleSeekTeardown = () =>
    this.setState({
      seekPositionPercent: 0,
      isSeekingBehind: false
    })

  render() {
    const { progress } = this.props
    const { seekPositionPercent, isSeekingBehind } = this.state
    const barClass = isSeekingBehind ? 'inverted' : ''
    return (
      <div
        ref={c => (this.container = c)}
        className={`playback-progress-container ${barClass}`}
        onClick={this.handleSeekTo}
        onMouseMove={this.handleSeekPosition}
        onMouseLeave={this.handleSeekTeardown}
      >
        <div
          className='progress-bar'
          style={{ width: `${(progress * 100).toFixed(2)}%` }}
        />
        <div
          className='seek-bar'
          style={{ width: `${(seekPositionPercent * 100).toFixed(2)}%` }}
        />
      </div>
    )
  }
}

export default ProgressBar
