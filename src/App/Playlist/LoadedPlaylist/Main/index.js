import React from 'react'
import PlaylistHeader from './PlaylistHeader'
import Tracklist from './Tracklist'
import './Main.scss'

const Main = ({
  spotify,
  playlist,
  playback,
  currentTrackID,
  selectedTrack,
  progressMs,
  overrideUIPaused,
  overrideUISelectedTrack,
  tracklistDisplacement
}) => (
  <div className='main-container'>
    <PlaylistHeader playlist={playlist} />
    <div className='tracklist-container'>
      <Tracklist
        spotify={spotify}
        playlist={playlist}
        playback={playback}
        currentTrackID={currentTrackID || ''}
        selectedTrack={selectedTrack}
        progressMs={progressMs}
        overrideUIPaused={overrideUIPaused}
        overrideUISelectedTrack={overrideUISelectedTrack}
        tracklistDisplacement={tracklistDisplacement}
      />
    </div>
  </div>
)

export default Main
