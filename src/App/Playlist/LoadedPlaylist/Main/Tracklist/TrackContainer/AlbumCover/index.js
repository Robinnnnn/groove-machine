import React, { Component } from 'react'
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
      </div>
    )
  }
}

export default AlbumCover
