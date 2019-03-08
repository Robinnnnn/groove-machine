import React, { Component } from 'react'
import Sidebar from './Sidebar'
import SearchForm from './SearchForm'
import Main from './Main'
import './LoadedPlaylist.scss'

class LoadedPlaylist extends Component {
  state = {
    sidebarActive: false,
    sidebarWidth: 100,
    sidebarLocked: false,
    searchActive: false
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.determineSidebarDisplay)
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.determineSidebarDisplay)
  }

  determineSidebarDisplay = e => {
    const {
      sidebarWidth,
      sidebarActive,
      sidebarLocked,
      searchActive
    } = this.state
    if (sidebarLocked) return
    let shouldsidebarActive = false
    if (e.clientX < sidebarWidth) shouldsidebarActive = true
    if (shouldsidebarActive !== sidebarActive && !searchActive)
      this.setState({ sidebarActive: shouldsidebarActive })
  }

  toggleSearch = () => this.setState({ searchActive: !this.state.searchActive })

  toggleSidebarLock = () =>
    this.setState({ sidebarLocked: !this.state.sidebarLocked })

  render() {
    // TODO: A lot of these props should just be
    // directly ingested further down via context
    const {
      playlist,
      spotify,
      playback,
      isShuffleActive,
      currentTrackId,
      activeTrack,
      progressMs,
      markPlaying,
      markPaused,
      overrideActiveTrack
    } = this.props
    const { sidebarActive, sidebarWidth, searchActive } = this.state

    const sidebarStyle = {
      transform: `translateX(${sidebarActive ? 0 : sidebarWidth * -1 + 60}px)`
    }

    const searchWidth = window.innerWidth - sidebarWidth - 200
    const searchStyle = {
      width: window.innerWidth - sidebarWidth - 200
    }

    const mainStyle = {
      transform: `translateX(${
        sidebarActive ? sidebarWidth + (searchActive ? searchWidth : 0) : 0
      }px)`
    }

    return (
      <div className='loaded-playlist-container'>
        <div className='playlist-sidebar-container' style={sidebarStyle}>
          <Sidebar
            width={sidebarWidth}
            toggleSearch={this.toggleSearch}
            toggleSidebarLock={this.toggleSidebarLock}
            playlist={playlist}
            playback={playback}
            isShuffleActive={isShuffleActive}
            currentTrackId={currentTrackId}
            overrideActiveTrack={overrideActiveTrack}
            markPlaying={markPlaying}
            markPaused={markPaused}
          />
        </div>
        <div className='playlist-search-container' style={searchStyle}>
          <SearchForm visible={searchActive} />
        </div>
        <div className='playlist-main-container' style={mainStyle}>
          <Main
            spotify={spotify}
            playlist={playlist}
            currentTrackId={currentTrackId}
            activeTrack={activeTrack}
            progressMs={progressMs}
            overrideActiveTrack={overrideActiveTrack}
          />
        </div>
        {
          // Temporary disable MediaPlayer until design is finalized.
          // https://github.com/Robinnnnn/spotify-playlist-viewer/issues/14
          // <MediaPlayer
          //   spotify={spotify}
          //   playback={playback}
          // />
        }
      </div>
    )
  }
}

export default LoadedPlaylist