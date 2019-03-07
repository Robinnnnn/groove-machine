import React, { Component } from 'react'
import Sidebar from './Sidebar'
import Main from './Main'
import './LoadedPlaylist.scss'

class LoadedPlaylist extends Component {
  state = { displaySidebar: false, sidebarWidth: 120, sidebarLocked: false }

  componentDidMount() {
    document.addEventListener('mousemove', this.determineSidebarDisplay)
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.determineSidebarDisplay)
  }

  determineSidebarDisplay = e => {
    const { sidebarWidth, displaySidebar, sidebarLocked } = this.state
    if (sidebarLocked) return
    let shouldDisplaySidebar = false
    if (e.clientX < sidebarWidth) shouldDisplaySidebar = true
    if (shouldDisplaySidebar !== displaySidebar)
      this.setState({ displaySidebar: shouldDisplaySidebar })
  }

  toggleSidebarLock = () =>
    this.setState({ sidebarLocked: !this.state.sidebarLocked })

  render() {
    // TODO: A lot of these props should just be
    // directly ingested further down via context
    const {
      playlist,
      spotify,
      playback,
      currentTrackId,
      activeTrack,
      progressMs,
      markPlaying,
      markPaused,
      overrideActiveTrack
    } = this.props
    const { displaySidebar, sidebarWidth } = this.state

    const sidebarStyle = {
      transform: `translateX(${displaySidebar ? 0 : sidebarWidth * -1 + 60}px)`
    }
    const mainStyle = {
      transform: `translateX(${displaySidebar ? sidebarWidth : 0}px)`
    }

    return (
      <div className='loaded-playlist-container'>
        <div className='playlist-sidebar-container' style={sidebarStyle}>
          <Sidebar
            toggleSidebarLock={this.toggleSidebarLock}
            currentTrackId={currentTrackId}
            playlist={playlist}
            playback={playback}
            overrideActiveTrack={overrideActiveTrack}
            markPlaying={markPlaying}
            markPaused={markPaused}
          />
        </div>
        <div className='playlist-main-container' style={mainStyle}>
          <Main
            playlist={playlist}
            spotify={spotify}
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
