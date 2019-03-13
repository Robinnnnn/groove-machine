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
    sidebarLocked: false,
    searchActive: false,
    devicesActive: false,
    sidebarWidth: 100,
    // The lower this is, the stronger the parallax
    sidebarParallaxStrength: 0.6,
    // We don't want the main view to be pushed all the way to the right
    minMainViewWidth: 200,
    // We also don't want the revealed view to be too wide
    maxRevealWidth: 640,
    // The higher this is, the stronger the pull upon reveal
    tracklistPullStrength: 0.3
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
      searchActive,
      devicesActive
    } = this.state
    if (sidebarLocked) return
    let shouldsidebarActive = false
    if (e.clientX < sidebarWidth) shouldsidebarActive = true
    const okayToClose = !searchActive && !devicesActive
    if (shouldsidebarActive !== sidebarActive && okayToClose)
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
      setDevice,
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
      searchActive,
      devicesActive,
      sidebarWidth,
      sidebarParallaxStrength,
      minMainViewWidth,
      maxRevealWidth,
      tracklistPullStrength
    } = this.state

    // Sidebar is either hidden or poking out by its own width;
    // parallax effect is applied as it slides out
    const sidebarStyle = {
      transform: `translateX(${
        sidebarActive
          ? 0
          : sidebarWidth * -1 + sidebarWidth * sidebarParallaxStrength
      }px)`
    }

    // Accumulate openness pixels based on certain factors
    let openWidth = 0
    // Reveal at least a sidebar's worth if it's active
    if (sidebarActive) openWidth += sidebarWidth
    // Calculate happy medium where revealed view is comfortably wide
    // while the main view is still in sight
    const spaceBetweenSidebarAndMainView =
      window.innerWidth - sidebarWidth - minMainViewWidth
    let fullRevealWidth = Math.min(
      spaceBetweenSidebarAndMainView,
      maxRevealWidth
    )
    // If either search form OR device selection is active, trigger reveal
    const shouldFullyReveal = searchActive || devicesActive
    if (shouldFullyReveal) openWidth += fullRevealWidth

    // The main view will be displaced by the total open width
    const mainStyle = {
      transform: `translateX(${openWidth}px)`
    }

    const searchStyle = { width: fullRevealWidth }

    const devicesStyle = { width: fullRevealWidth }

    // While the tracklist is horizontally centered at rest, it can get pushed
    // out of view upon inner content reveal. To combat this, we tug it to the
    // left as the main view is pushed right.
    const calculatedMainViewWidth = Math.max(
      window.innerWidth - openWidth,
      minMainViewWidth
    )
    const tracklistDisplacement = shouldFullyReveal
      ? -1 * calculatedMainViewWidth * tracklistPullStrength
      : 0

    return (
      <div className='loaded-playlist-container'>
        <div className='playlist-sidebar-container' style={sidebarStyle}>
          <Sidebar
            width={sidebarWidth}
            searchActive={searchActive}
            toggleSearch={this.toggleSearch}
            toggleSidebarLock={this.toggleSidebarLock}
            devicesActive={devicesActive}
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
          <DevicesList
            visible={devicesActive}
            devices={devices}
            setDevice={setDevice}
          />
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
