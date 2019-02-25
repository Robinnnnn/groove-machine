import React from 'react'
import PropTypes from 'prop-types'
import './ActiveTrackSeeker.scss'

const ActiveTrackSeeker = ({ activeTrackPosition }) => {
  const anchorStyle = {}
  switch (activeTrackPosition) {
    case 'below_viewport':
      anchorStyle.bottom = 0
      break;
    case 'above_viewport':
      anchorStyle.top = 0
      break;
    // A track finder wouldn't be very helpful if there isn't an active track,
    // or if it's already within the user's viewport.
    case '':
    case 'within_viewport':
    default:
      return null;
  }

  return (
    <div
      className='active-track-seeker'
      style={anchorStyle}
    >
      {activeTrackPosition}
    </div>
  )
}

ActiveTrackSeeker.propTypes = {
  activeTrackPosition: PropTypes.oneOf([
    '',
    'within_viewport',
    'below_viewport',
    'above_viewport'
  ])
}

export default ActiveTrackSeeker
