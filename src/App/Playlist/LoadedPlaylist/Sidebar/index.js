import React, { useContext } from 'react'
import { SpotifyContext } from 'Contexts/index'
import VerticalRule from './VerticalRule'
import MediaControls from './MediaControls'
import Search from './Icons/SearchIcon'
import Icons from './Icons'
import './Sidebar.scss'

const Sidebar = ({
  width,
  searchActive,
  toggleSearch,
  toggleSidebarLock,
  devicesActive,
  toggleDevices,
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
      <Search toggleSearch={toggleSearch} />

      <MediaControls
        playlist={playlist}
        isPlaying={playback.is_playing}
        isShuffleActive={isShuffleActive}
        progressMs={playback.progress_ms}
        currentTrackId={currentTrackId}
        controller={controller}
      />

      <Icons
        devicesActive={devicesActive}
        toggleDevices={toggleDevices}
        isShuffleActive={isShuffleActive}
        toggleShuffle={spotify.setShuffle}
        toggleSidebarLock={toggleSidebarLock}
      />

      <VerticalRule active={searchActive || devicesActive} />
    </div>
  )
}

export default Sidebar
