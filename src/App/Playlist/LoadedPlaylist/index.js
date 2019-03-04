import React, { Component } from 'react'
import Sidebar from './Sidebar'
import Main from './Main'
import './LoadedPlaylist.scss'

class LoadedPlaylist extends Component {
  render() {
    // TODO: A lot of these props should just be
    // directly ingested further down via context
    const {
      playlist,
      spotify,
      currentTrackId,
      activeTrack,
      progressMs,
      overrideActiveTrack,
      activeTrackPosition,
      scrollToActiveTrack
    } = this.props

    return (
      <div className='loaded-playlist-container'>
        <Sidebar />
        <Main
          playlist={playlist}
          spotify={spotify}
          currentTrackId={currentTrackId}
          activeTrack={activeTrack}
          progressMs={progressMs}
          overrideActiveTrack={overrideActiveTrack}
          activeTrackPosition={activeTrackPosition}
          locateActiveTrack={scrollToActiveTrack}
        />
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
