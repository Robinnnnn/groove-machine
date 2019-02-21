import React, { createContext, useReducer } from 'react'

const SpotifyContext = createContext()

const initialState = {
  spotify: null
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
    default:
      return state
  }
}

const SpotifyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = { state, dispatch }

  return (
    <SpotifyContext.Provider value={value}>
      {children}
    </SpotifyContext.Provider>
  )
}

const SpotifyConsumer = SpotifyContext.Consumer

export { SpotifyContext, SpotifyProvider, SpotifyConsumer }

