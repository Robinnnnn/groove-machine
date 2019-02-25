import React, { createContext, useReducer, useEffect } from 'react'
import { loadState, saveState } from './localStorage'

const SpotifyContext = createContext()

const initialState = {
  ID: 'spotify',
  spotify: null,
  aToken: null,
  rToken: null,
  activeTrackNode: null
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
        rToken: action.payload.rToken
      }
    case 'set_track_node':
      return {
        ...state,
        activeTrackNode: action.payload
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

