import React, { useEffect, useState, createContext } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getData } from "../utilities/firebase";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribeAuthListener = () => {
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          await refreshUserFromDatabase(user.uid);
        } else {
          setUser(null);
        }
      });
    };

    return () => {
      unsubscribeAuthListener();
    };
  }, []);

  const refreshUserFromDatabase = async (userId) => {
    const userFromDatabase = await getData("/users/" + userId);
    setUser(userFromDatabase);
  };

  return (
    <UserContext.Provider value={{ user, refreshUserFromDatabase }}>
      {children}
    </UserContext.Provider>
  );
};
