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
  sidebarLocked,
  toggleSidebarLock,
  devicesActive,
  toggleDevices,
  currentTrackID,
  playlist,
  playback,
  isShuffleActive,
  overrideUISelectedTrack,
  overrideUIPlaying,
  overrideUIPaused,
  overrideUIShuffle,
  logoutUser
}) => {
  const context = useContext(SpotifyContext)
  const {
    state: { spotify }
  } = context

  const controller = {
    // spotify controls
    play: spotify.play,
    pause: spotify.pause,
    seek: spotify.seek,
    previous: spotify.skipToPrevious,
    next: spotify.skipToNext,
    getCurrentTrackFromServer: spotify.getMyCurrentPlayingTrack,

    // native UI controls
    overrideUIPlaying,
    overrideUIPaused,
    overrideUISelectedTrack
  }

  return (
    <div className='sidebar' style={{ width }}>
      <Search toggleSearch={toggleSearch} />

      <MediaControls
        playlist={playlist}
        isPlaying={playback.is_playing || false}
        isShuffleActive={isShuffleActive}
        progressMs={playback.progress_ms || 0}
        currentTrackID={currentTrackID}
        controller={controller}
      />

      <Icons
        devicesActive={devicesActive}
        toggleDevices={toggleDevices}
        isShuffleActive={isShuffleActive}
        toggleShuffle={overrideUIShuffle}
        sidebarLocked={sidebarLocked}
        toggleSidebarLock={toggleSidebarLock}
        logoutUser={logoutUser}
      />

      <VerticalRule active={searchActive || devicesActive} />
    </div>
  )
}

export default Sidebar
