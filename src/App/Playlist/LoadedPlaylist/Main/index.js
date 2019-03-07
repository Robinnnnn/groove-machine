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
  overrideActiveTrack
}) => (
  <div className='main-container'>
    <PlaylistHeader playlist={playlist} />
    <Tracklist
      spotify={spotify}
      playlist={playlist}
      currentTrackId={currentTrackId || ''}
      activeTrack={activeTrack}
      progressMs={progressMs}
      overrideActiveTrack={overrideActiveTrack}
    />
  </div>
)

export default Main
