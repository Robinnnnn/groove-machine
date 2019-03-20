// Validates the input value to encapsulate a Spotify playlist
export const validate = ({ playlist }) =>
  [isSpotifyUrl, isSpotifyUri, isSpotifyID, isValentinesPassword].reduce(
    (r, f) => r || f(playlist && playlist.trim()),
    false
  )

// Validates a string to be a Spotify URL
// Example: https://open.spotify.com/user/spotify/playlist/37i9dQZF1DXcBWIGoYBM5M?si=ra_1itFoTZehUBHH3-oz4g
const isSpotifyUrl = s => {
  const rx = /^(https:\/\/)?.*\.spotify\.com\/user\/([a-zA-Z0-9]+)\/playlist\/([a-zA-Z0-9]{22})/i
  const match = rx.exec(s)
  return match && match[3]
}

// Validates a string to be a Spotify URI
// Example: spotify:user:uplifted:playlist:5zwn4IStxMhOicloSwzvgx
const isSpotifyUri = s => {
  const rx = /^spotify:user:([a-zA-Z0-9]+):playlist:([a-zA-Z0-9]{22})$/i
  const match = rx.exec(s)
  return match && match[2]
}

// Validates a string to be a Spotify ID
// Example: 5zwn4IStxMhOicloSwzvgx
const isSpotifyID = s => {
  const rx = /^[a-zA-Z0-9]{22}$/i
  const match = rx.exec(s)
  return match && match[0]
}

// Validates valentine's easter egg
const isValentinesPassword = s => {
  const rx = /^vday2019$/i
  const match = rx.exec(s)
  return match && '3a6kAci1fsVoCPJXltCvIv'
}
