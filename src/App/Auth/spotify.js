import Spotify from 'spotify-web-api-js'

const waitForSpotifyWebPlaybackSDK = () =>
  new Promise(resolve => {
    if (window.Spotify) resolve(window.Spotify)
    else window.onSpotifyWebPlaybackSDKReady = () => resolve(window.Spotify)
  })

const handleWebAPI = (accessToken, refreshToken) => {
  const spotify = new Spotify()
  if (accessToken) {
    spotify.setAccessToken(accessToken)
    // Set token to refresh periodically
    const tenMinutes = 1000 * 60 * 10
    setInterval(() => requestNewToken(refreshToken, spotify), tenMinutes)
    return spotify
  }
  return null
}

const handleWebPlaybackSDK = async (spotify, accessToken, refreshToken) => {
  // Programmatically load Connect SDK
  const script = document.createElement('script')
  script.src = 'https://sdk.scdn.co/spotify-player.js'
  script.async = true
  document.body.appendChild(script)

  const { Player } = await waitForSpotifyWebPlaybackSDK()

  const player = new Player({
    name: 'GROOVE MACHINE 💖',
    volume: 1.0,
    getOAuthToken: callback => {
      requestNewToken(refreshToken, spotify)
      callback(accessToken)
    }
  })

  const connected = await player.connect()
  if (connected) console.log('Established connection with Web Playback SDK')

  return new Promise(resolve => {
    player.addListener('ready', ({ device_id }) => resolve(device_id))
  })
}

// Creates a spotify client
export const initSpotifyClient = async ({ access_token, refresh_token }) => {
  const spotify = await handleWebAPI(access_token, refresh_token)
  if (spotify) {
    const deviceId = await handleWebPlaybackSDK(
      spotify,
      access_token,
      refresh_token
    )
    return { spotify, deviceId }
  }
  return {}
}

// Retrieves a new access token using a refresh token
// https://developer.spotify.com/documentation/ios/guides/token-swap-and-refresh/
export const requestNewToken = async (refreshToken, spotify) => {
  const res = await fetch(`/api/refresh_token?refresh_token=${refreshToken}`)
  const json = await res.json()
  const aToken = json.access_token
  spotify.setAccessToken(aToken)
  console.log('refreshed the user token!')
  return aToken
}
