import React, { createContext, useReducer, useEffect } from 'react'
import { loadState, saveState } from '../localStorage'
import { scrollToNode } from './util'

const SpotifyContext = createContext()

const initialState = {
  ID: 'spotify',
  spotify: null,
  aToken: '',
  rToken: '',
  lastTokenIssueTime: 0,
  activeTrackNode: null,
  scrollToActiveTrack: () => {}
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'initialize':
      return {
        ...state,
        spotify: action.payload
      }
    case 'teardown':
      return initialState
    case 'set_tokens':
      return {
        ...state,
        aToken: action.payload.aToken,
        rToken: action.payload.rToken,
        lastTokenIssueTime: Date.now()
      }
    case 'set_refreshed_token':
      return {
        ...state,
        aToken: action.payload.aToken,
        lastTokenIssueTime: Date.now()
      }
    case 'set_track_node':
      const scrollToActiveTrack = () => scrollToNode(action.payload)

      // Actually scroll to the selected track.
      //
      // `setTimeout` is used because we need to wait for all tracks to plaster
      // onto the DOM, since the document height dynamically increases as tracks
      // beneath the viewport are lazy-loaded. Not waiting will cause a defective
      // scroll position. Hard-coding a number here is hacky, but it's otherwise
      // very difficult to determine when the "rest" of the tracks have mounted
      // post-animation. See `Tracklist` component for animation strategy.
      setTimeout(scrollToActiveTrack, 300)
      return {
        ...state,
        activeTrackNode: action.payload,
        scrollToActiveTrack
      }
    default:
      return state
  }
}

const SpotifyProvider = ({ children }) => {
  const persistedState = loadState(initialState.ID)
  const [state, dispatch] = useReducer(reducer, persistedState || initialState)
  const value = { state, dispatch }
  useEffect(() => saveState(initialState.ID, state))

  return (
    <SpotifyContext.Provider value={value}>
      {children}
    </SpotifyContext.Provider>
  )
}

const SpotifyConsumer = SpotifyContext.Consumer

export { SpotifyContext, SpotifyProvider, SpotifyConsumer }

