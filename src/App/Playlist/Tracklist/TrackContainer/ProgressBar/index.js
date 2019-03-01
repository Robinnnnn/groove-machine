import React from 'react'
import PropTypes from 'prop-types'
import './ProgressBar.scss'

const ProgressBar = ({ progress }) => (
  <div className='playback-progress-container'>
    <div
      className='progress-bar'
      style={{ width: `${(progress * 100).toFixed(2)}%` }}
    />
  </div>
)

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired
}

export default ProgressBar
