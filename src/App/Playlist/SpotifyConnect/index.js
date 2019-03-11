import React, { Component } from 'react'
import { SpotifyContext } from 'Contexts/index'

class SpotifyConnect extends Component {
  static contextType = SpotifyContext

  componentDidMount() {
    console.log('mounting spotify connect')

    const script = document.createElement('script')

    script.src = 'https://sdk.scdn.co/spotify-player.js'
    script.async = true

    document.body.appendChild(script)

    window.onSpotifyWebPlaybackSDKReady = () => {
      console.log(
        'The Web Playback SDK is ready. We have access to Spotify.Player'
      )
      console.log(window.Spotify.Player)
    }

    async function waitForSpotifyWebPlaybackSDKToLoad() {
      return new Promise(resolve => {
        if (window.Spotify) {
          resolve(window.Spotify)
        } else {
          window.onSpotifyWebPlaybackSDKReady = () => {
            resolve(window.Spotify)
          }
        }
      })
    }

    ;(async () => {
      const { Player } = await waitForSpotifyWebPlaybackSDKToLoad()
      console.log('The Web Playback SDK has loaded.')

      const {
        state: { aToken }
      } = this.context

      const sdk = new Player({
        name: 'IN BROWSER PLAYER',
        volume: 1.0,
        getOAuthToken: callback => callback(aToken)
      })

      const connected = await sdk.connect()
      if (connected) {
        // Connection was successful
        console.log('CONNECTED')
      }
    })()
  }

  render() {
    return <div />
  }
}

export default SpotifyConnect
