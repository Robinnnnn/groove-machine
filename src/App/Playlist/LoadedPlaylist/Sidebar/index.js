import React, { useContext } from 'react'
import { SpotifyContext } from 'Contexts/index'
import { navigate } from '@reach/router'
import { ReactComponent as SearchLogo } from './search.svg'
import './Sidebar.scss'
import Controls from './Controls'

const Sidebar = ({ playback }) => {
  const context = useContext(SpotifyContext)
  const {
    state: { spotify }
  } = context

  const loadSearch = () => navigate('/search')

  return (
    <div className='sidebar'>
      <div className='search-icon-container'>
        <SearchLogo className='search-icon' onClick={loadSearch} />
      </div>
      <Controls
        isPlaying={playback.is_playing}
        progressMs={playback.progress_ms}
        play={spotify.play}
        pause={spotify.pause}
        seek={spotify.seek}
        previous={spotify.skipToPrevious}
        next={spotify.skipToNext}
      />
    </div>
  )
}

export default Sidebar
