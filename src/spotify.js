import Spotify from 'spotify-web-api-js';

const getHashParams = () => {
  var hashParams = {};
  var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
  e = r.exec(q)
  while (e) {
     hashParams[e[1]] = decodeURIComponent(e[2]);
     e = r.exec(q);
  }
  return hashParams;
}

export default function initSpotifyClient() {
  const spotify = new Spotify()
  const { access_token, refresh_token } = getHashParams()
  if (access_token) {
    spotify.setAccessToken(access_token)
    return {
      spotify,
      accessToken: access_token,
      refreshToken: refresh_token
    }
  }
  return null
}
