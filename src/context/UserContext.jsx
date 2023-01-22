import React, {useState, createContext} from 'react'
import { getData } from '../utilities/firebase';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const setUserFromDatabase = async (value) => {
    console.log(value)
    const userFromDatabase = value ? await getData("/users/" + value.uid) : null
    console.log(userFromDatabase)
    setUser(value)
  }

  return (
    <UserContext.Provider value={{ user, setUserFromDatabase }}>
        {children}
    </UserContext.Provider>
  )
}