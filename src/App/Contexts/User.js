import React, { createContext, useReducer, useEffect } from 'react'
import { loadState, saveState } from './localStorage'

const UserContext = createContext()

const initialState = {
  ID: 'user',
  authenticated: false,
  data: null
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        authenticated: true,
        user: action.payload
      }
    case 'logout':
      return initialState
    default:
      return state
  }
}

const UserProvider = ({ children }) => {
  const persistedState = loadState(initialState.ID)
  const [state, dispatch] = useReducer(reducer, persistedState || initialState)
  const value = { state, dispatch }
  useEffect(() => saveState(initialState.ID, state))

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

const UserConsumer = UserContext.Consumer

export { UserContext, UserProvider, UserConsumer }
