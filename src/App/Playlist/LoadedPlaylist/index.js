import React, { Component } from 'react'
import { navigate } from '@reach/router'
import queryString from 'query-string'
import Sidebar from './Sidebar'
import SearchForm from './SearchForm'
import DevicesList from './DevicesList'
import Main from './Main'
import './LoadedPlaylist.scss'

class LoadedPlaylist extends Component {
  state = {
    sidebarActive: false,
    sidebarWidth: 100,
    sidebarLocked: false,
    searchActive: false,
    devicesActive: false
  }

  componentDidMount() {
    const {
      location: { search }
    } = this.props
    const params = queryString.parse(search)
    if (params.search === 'true') {
      setTimeout(() => {
        document.addEventListener('mousemove', this.determineSidebarDisplay)
        this.setState({ sidebarActive: true, searchActive: true })
      }, 1500)
      return
    }
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

  toggleSearch = () => {
    const {
      location: { pathname, search }
    } = this.props
    this.setState({ searchActive: !this.state.searchActive })
    const params = queryString.parse(search)
    let query = ''
    if (!params.search) query = '?search=true'
    navigate(pathname + query)
  }

  toggleSidebarLock = () =>
    this.setState({ sidebarLocked: !this.state.sidebarLocked })

  toggleDevices = () =>
    this.setState({ devicesActive: !this.state.devicesActive })

  setNewPlaylist = id => {
    navigate(`/playlist/${id}`)
    this.setState({
      searchActive: false,
      sidebarActive: this.state.sidebarLocked
    })
  }

  render() {
    // TODO: A lot of these props should just be
    // directly ingested further down via context
    const {
      spotify,
      devices,
      playlist,
      playback,
      isShuffleActive,
      currentTrackId,
      activeTrack,
      progressMs,
      markPlaying,
      markPaused,
      overrideActiveTrack
    } = this.props
    const {
      sidebarActive,
      sidebarWidth,
      searchActive,
      devicesActive
    } = this.state

    // Calculate openness based on certain factors
    let openWidth = 0
    let searchWidth = Math.min(window.innerWidth - sidebarWidth - 200, 640)
    if (sidebarActive) openWidth += sidebarWidth
    if (searchActive) openWidth += searchWidth

    // Sidebar is either hidden or poking out by its own width;
    // the +60 is for a parallax effect when it slides out
    const sidebarStyle = {
      transform: `translateX(${sidebarActive ? 0 : sidebarWidth * -1 + 60}px)`
    }

    // The main view will be displaced by the total open width
    const mainStyle = {
      transform: `translateX(${openWidth}px)`
    }

    const searchStyle = { width: searchWidth }

    const devicesStyle = { width: searchWidth }

    const vw = window.innerWidth / 100
    const tracklistDisplacement = searchActive
      ? Math.max(10 * vw * -1, (100 * vw - 740 - 40) * -1)
      : 0

    return (
      <div className='loaded-playlist-container'>
        <div className='playlist-sidebar-container' style={sidebarStyle}>
          <Sidebar
            width={sidebarWidth}
            searchActive={searchActive}
            toggleSearch={this.toggleSearch}
            toggleSidebarLock={this.toggleSidebarLock}
            toggleDevices={this.toggleDevices}
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
          <SearchForm visible={searchActive} onSubmit={this.setNewPlaylist} />
        </div>
        <div className='playlist-devices-container' style={devicesStyle}>
          <DevicesList visible={devicesActive} devices={devices} />
        </div>
        <div className='playlist-main-container' style={mainStyle}>
          <Main
            spotify={spotify}
            playlist={playlist}
            currentTrackId={currentTrackId}
            activeTrack={activeTrack}
            progressMs={progressMs}
            overrideActiveTrack={overrideActiveTrack}
            tracklistDisplacement={tracklistDisplacement}
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
