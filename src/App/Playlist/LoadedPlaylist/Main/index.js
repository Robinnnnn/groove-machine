import React from 'react'
import PlaylistHeader from './PlaylistHeader'
import Tracklist from './Tracklist'
import './Main.scss'

const Main = ({
  spotify,
  playlist,
  currentTrackId,
  activeTrack,
  progressMs,
  overrideActiveTrack,
  tracklistDisplacement
}) => (
  <div className='main-container'>
    <PlaylistHeader playlist={playlist} />
    <div className='tracklist-container'>
      <Tracklist
        spotify={spotify}
        playlist={playlist}
        currentTrackId={currentTrackId || ''}
        activeTrack={activeTrack}
        progressMs={progressMs}
        overrideActiveTrack={overrideActiveTrack}
        tracklistDisplacement={tracklistDisplacement}
      />
    </div>
  </div>
)

export default Main
