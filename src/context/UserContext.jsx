import React, {useState, createContext} from 'react'
import { getData } from '../utilities/firebase';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const sessionSt = JSON.parse(sessionStorage.getItem("user"));
  const [user, setUser] = useState(sessionSt ? sessionSt : null);

  const setUserFromDatabase = async (value) => {
    console.log(value)
    const userFromDatabase = value ? await getData("/users/" + value.uid) : null
    console.log(userFromDatabase)
    setUser(userFromDatabase)
    sessionStorage.setItem("user", JSON.stringify(userFromDatabase))
  }

  const updateUser = async (value) => {
    console.log(value)
    const userFromDatabase = value ? await getData("/users/" + value.userId) : null
    console.log(userFromDatabase)
    setUser(userFromDatabase)
    sessionStorage.setItem("user", JSON.stringify(userFromDatabase))
  }

  return (
    <UserContext.Provider value={{ user, setUserFromDatabase, updateUser }}>
        {children}
    </UserContext.Provider>
  )
}