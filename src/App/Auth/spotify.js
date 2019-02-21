import Spotify from 'spotify-web-api-js';

const refreshTokenPeriodically = (refreshToken, spotify, ms) =>
  setInterval(() =>
    fetch(`/api/refresh_token?refresh_token=${refreshToken}`)
      .then(r => r.json())
      .then(({ access_token }) => spotify.setAccessToken(access_token))
    , ms
  )

const initSpotifyClient = ({ access_token, refresh_token }) => {
  const spotify = new Spotify()
  if (access_token) {
    spotify.setAccessToken(access_token)
    refreshTokenPeriodically(refresh_token, spotify, 1000 * 60 * 10) // 10 mins
    return spotify
  }
  return null
}

export default initSpotifyClient
