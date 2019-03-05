import React, { useContext } from 'react'
import { SpotifyContext } from 'Contexts/index'
import { navigate } from '@reach/router'
import { ReactComponent as SearchLogo } from './search.svg'
import './Sidebar.scss'
import Controls from './Controls'

const Sidebar = ({
  currentTrackId,
  playlist,
  playback,
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

  return (
    <div className='sidebar'>
      <div className='search-icon-container'>
        <SearchLogo className='search-icon' onClick={loadSearch} />
      </div>
      <Controls
        currentTrackId={currentTrackId}
        playlist={playlist}
        overrideActiveTrack={overrideActiveTrack}
        isPlaying={playback.is_playing}
        progressMs={playback.progress_ms}
        markPlaying={markPlaying}
        markPaused={markPaused}
        play={controlPlay}
        pause={controlPause}
        seek={spotify.seek}
        previous={spotify.skipToPrevious}
        next={spotify.skipToNext}
      />
    </div>
  )
}

export default Sidebar
