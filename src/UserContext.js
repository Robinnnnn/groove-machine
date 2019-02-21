import React, { createContext, useReducer } from 'react'

const UserContext = createContext()

const initialState = {
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
    default:
      return state
  }
}

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = { state, dispatch }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

const UserConsumer = UserContext.Consumer

export { UserContext, UserProvider, UserConsumer }
