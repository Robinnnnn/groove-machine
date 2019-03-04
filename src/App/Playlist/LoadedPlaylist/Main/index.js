import React from 'react'
import PlaylistHeader from './PlaylistHeader'
import Tracklist from './Tracklist'
import ActiveTrackSeeker from './ActiveTrackSeeker'
import './Main.scss'

const Main = ({
  playlist,
  spotify,
  currentTrackId,
  activeTrack,
  progressMs,
  overrideActiveTrack,
  activeTrackPosition,
  scrollToActiveTrack
}) => (
  <div className='playlist-main-container'>
    <PlaylistHeader playlist={playlist} />
    <Tracklist
      spotify={spotify}
      playlist={playlist}
      currentTrackId={currentTrackId || ''}
      activeTrack={activeTrack}
      progressMs={progressMs}
      overrideActiveTrack={overrideActiveTrack}
    />
    <ActiveTrackSeeker
      activeTrackPosition={activeTrackPosition}
      locateActiveTrack={scrollToActiveTrack}
    />
  </div>
)

export default Main
