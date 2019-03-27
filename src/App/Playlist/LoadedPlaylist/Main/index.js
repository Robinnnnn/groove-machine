import React from 'react'
import PlaylistHeader from './PlaylistHeader'
import Tracklist from './Tracklist'
import './Main.scss'

const Main = ({
  spotify,
  playlist,
  currentTrackID,
  activeTrack,
  progressMs,
  overrideUIActiveTrack,
  tracklistDisplacement
}) => (
  <div className='main-container'>
    <PlaylistHeader playlist={playlist} />
    <div className='tracklist-container'>
      <Tracklist
        spotify={spotify}
        playlist={playlist}
        currentTrackID={currentTrackID || ''}
        activeTrack={activeTrack}
        progressMs={progressMs}
        overrideUIActiveTrack={overrideUIActiveTrack}
        tracklistDisplacement={tracklistDisplacement}
      />
    </div>
  </div>
)

export default Main
