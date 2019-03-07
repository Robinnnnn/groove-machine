import React, { useContext } from 'react'
import { SpotifyContext } from 'Contexts/index'
import { navigate } from '@reach/router'
import { ReactComponent as SearchLogo } from './search.svg'
import MediaControls from './MediaControls'
import Shuffle from './Shuffle'
import Lock from './Lock'
import './Sidebar.scss'

const Sidebar = ({
  width,
  toggleSidebarLock,
  currentTrackId,
  playlist,
  playback,
  isShuffleActive,
  overrideActiveTrack,
  markPlaying,
  markPaused
}) => {
  const context = useContext(SpotifyContext)
  const {
    state: { spotify }
  } = context

  const loadSearch = () => navigate('/search')

  const controlPlay = () => {
    markPlaying()
    spotify.play()
  }

  const controlPause = () => {
    markPaused()
    spotify.pause()
  }

  const controller = {
    play: controlPlay,
    pause: controlPause,
    seek: spotify.seek,
    previous: spotify.skipToPrevious,
    next: spotify.skipToNext,

    overrideActiveTrack,
    getCurrentTrackFromServer: spotify.getMyCurrentPlayingTrack
  }

  return (
    <div className='sidebar' style={{ width }}>
      <div className='search-icon-container'>
        <SearchLogo className='search-icon' onClick={loadSearch} />
      </div>
      <MediaControls
        playlist={playlist}
        isPlaying={playback.is_playing}
        isShuffleActive={isShuffleActive}
        currentTrackId={currentTrackId}
        progressMs={playback.progress_ms}
        controller={controller}
      />
      <Shuffle
        isShuffleActive={isShuffleActive}
        toggleSidebarShuffle={spotify.setShuffle}
      />
      <Lock toggleSidebarLock={toggleSidebarLock} />
    </div>
  )
}

export default Sidebar
