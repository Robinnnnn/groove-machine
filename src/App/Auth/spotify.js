import Spotify from 'spotify-web-api-js'

// Creates a spotify client
export const initSpotifyClient = ({ access_token, refresh_token }) => {
  const spotify = new Spotify()
  if (access_token) {
    spotify.setAccessToken(access_token)
    // Set token to refresh periodically
    const tenMinutes = 1000 * 60 * 10
    setInterval(() => requestNewToken(refresh_token, spotify), tenMinutes)
    return spotify
  }
  return null
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
