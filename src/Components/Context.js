import React, { createContext, useState } from 'react'

export const LocationContext = createContext(null)

const LocationProvider = ({ children }) => {
  const [ location, setLocation ] = useState('')
  return (
    <LocationContext.Provider value={{location, setLocation}}>
      {children}
    </LocationContext.Provider>
  )
}

export default LocationProvider;