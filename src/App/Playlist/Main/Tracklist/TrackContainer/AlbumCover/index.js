import React, { Component } from 'react'
import { ReactComponent as PlayLogo } from '../../../../MediaPlayer/Controls/icons/play.svg'
import './AlbumCover.scss'

class AlbumCover extends Component {
  render() {
    const { imgUrl, activeClass, hoverClass, openAlbum } = this.props

    const displayPlay = !activeClass && hoverClass

    return (
      <div
        className={`album-cover-container ${activeClass} ${displayPlay}`}
        onClick={e => activeClass && openAlbum(e)}
      >
        <img className='album-cover' src={imgUrl} alt='cover' />
        <div className='hole' />
        <div className='play-icon-container'>
          <PlayLogo className='play-icon' />
        </div>
      </div>
    )
  }
}

export default AlbumCover
