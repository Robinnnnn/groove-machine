import React, { Component } from 'react'
import './AlbumCover.scss'

class AlbumCover extends Component {
  render() {
    const {
      imgUrl,
      pausedClass,
      activeClass,
      hoverClass,
      openAlbum
    } = this.props

    const enableHoverFx = !activeClass && !pausedClass && hoverClass

    return (
      <div
        className={`album-cover-container ${activeClass} ${pausedClass} ${enableHoverFx}`}
        onClick={e => activeClass && openAlbum(e)}
      >
        <img className='album-cover' src={imgUrl} alt='cover' />
        <div className='hole' />
      </div>
    )
  }
}

export default AlbumCover
