import React, { useEffect, useState, createContext } from "react";
import {
  getAuth,
  onAuthStateChanged,
  getAdditionalUserInfo,
} from "firebase/auth";
import { getData } from "../utilities/firebase";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribeAuthListener = () => {
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          await setUserFromDatabase(user.uid);
        } else {
          setUser(null);
        }
      });
    };

    return () => {
      unsubscribeAuthListener();
    };
  }, []);

  const setUserFromDatabase = async (userId) => {
    const userFromDatabase = await getData("/users/" + userId);
    console.log(userFromDatabase);
    setUser({ ...userFromDatabase });
  };

  return (
    <UserContext.Provider value={{ user, setUserFromDatabase }}>
      {children}
    </UserContext.Provider>
  );
};
