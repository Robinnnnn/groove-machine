import React from 'react'
import PropTypes from 'prop-types'
import './ActiveTrackSeeker.scss'

const ActiveTrackSeeker = ({ activeTrackPosition }) => {
  const anchorStyle = {}
  switch (activeTrackPosition) {
    case 'below_viewport':
      anchorStyle.bottom = 0
      anchorStyle.opacity = 1
      break;
    case 'above_viewport':
      anchorStyle.top = 0
      anchorStyle.opacity = 1
      break;
    // Hide the track finder if there isn't an active track,
    // or if it's already within the user's viewport
    case '':
    case 'within_viewport':
    default:
      // TODO :
      // This will nicely fade-in the seeker via smooth transition,
      // but instantly remove it from view when the active track scrolls
      // into the viewport.
      //
      // To fix this, we would need to know the previous state of the
      // track position (`below_viewport` or `above_viewport`) and anchor
      // the element to `bottom` or `top` accordingly.
      // anchorStyle.(bottom|top) = 0
      anchorStyle.opacity = 0
  }

  return (
    <div
      className='active-track-seeker'
      style={anchorStyle}
    />
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
