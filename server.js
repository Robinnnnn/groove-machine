/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

const express = require('express') // Express web server framework
const path = require('path')
const request = require('request') // "Request" library
const cors = require('cors')
const querystring = require('querystring')
const cookieParser = require('cookie-parser')
const { clientId, clientSecret, baseurl } = require('./config')
const port = process.env.PORT || 4000

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = function(length) {
  let text = ''
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

const stateKey = 'spotify_auth_state'
const playlistQueryKey = 'playlist_id'

const app = express()

// app.use(express.static(__dirname + '/public'))
app
  .use(express.static(path.join(__dirname, 'build')))
  .use(cors())
  .use(cookieParser())

app.get('/api/login', function(req, res) {
  const state = generateRandomString(16)
  res.cookie(stateKey, state)
  const playlistId = req.query.playlist_id
  if (playlistId) res.cookie(playlistQueryKey, playlistId)

  // your application requests authorization
  const scope =
    'user-read-private user-read-email user-read-playback-state user-modify-playback-state'
  res.redirect(
    'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: clientId,
        scope: scope,
        redirect_uri: `${baseurl}/api/oauth`,
        state: state
      })
  )
})

app.get('/api/oauth', function(req, res) {
  // your application requests refresh and access tokens
  // after checking the state parameter

  const code = req.query.code || null
  const state = req.query.state || null
  let storedState = null
  let playlistQuery = ''
  if (req.cookies) {
    storedState = req.cookies[stateKey]
    playlistQuery = req.cookies[playlistQueryKey]
  }

  if (state === null || state !== storedState) {
    res.redirect(
      '/#' +
        querystring.stringify({
          error: 'state_mismatch'
        })
    )
  } else {
    res.clearCookie(stateKey)
    res.clearCookie(playlistQueryKey)
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: `${baseurl}/api/oauth`,
        grant_type: 'authorization_code'
      },
      headers: {
        Authorization:
          'Basic ' +
          Buffer.from(clientId + ':' + clientSecret).toString('base64')
      },
      json: true
    }

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        const access_token = body.access_token,
          refresh_token = body.refresh_token

        const options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { Authorization: 'Bearer ' + access_token },
          json: true
        }

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(body)
        })

        const q = querystring.stringify({
          access_token: access_token,
          refresh_token: refresh_token,
          playlist_id: playlistQuery
        })
        console.log('Attempting redirect...', q)

        const clientBaseurl =
          process.env.NODE_ENV === 'production'
            ? baseurl
            : 'http://localhost:3000'
        res.redirect(`${clientBaseurl}/oauth?` + q)
      } else {
        res.redirect(
          '/#' +
            querystring.stringify({
              error: 'invalid_token'
            })
        )
      }
    })
  }
})

app.get('/api/refresh_token', function(req, res) {
  // requesting access token from refresh token
  const refresh_token = req.query.refresh_token
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization:
        'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token
    },
    json: true
  }

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token
      res.send({ access_token })
    }
  })
})

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

console.log(`Listening on ${port}`)
app.listen(port)
