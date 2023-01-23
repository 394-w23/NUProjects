import React, { useEffect, useState, createContext } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getData } from "../utilities/firebase";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribeAuthListener = () => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const { email, photoURL, displayName, uid } = user;
          setUser({
            userId: uid,
            name: displayName,
            email: email,
            profilePic: photoURL,
          });
        } else {
          setUser(null);
        }
      });
    };

    return () => {
      unsubscribeAuthListener();
    };
  }, []);

  const setUserFromDatabase = async (value) => {
    const userFromDatabase = value
      ? await getData("/users/" + value.uid)
      : null;
    console.log(userFromDatabase);
    setUser(userFromDatabase);
    // sessionStorage.setItem("user", JSON.stringify(userFromDatabase));
  };

  const updateUser = async (value) => {
    const userFromDatabase = value
      ? await getData("/users/" + value.userId)
      : null;
    console.log(userFromDatabase);
    setUser(userFromDatabase);
    // sessionStorage.setItem("user", JSON.stringify(userFromDatabase));
  };

  return (
    <UserContext.Provider value={{ user, setUserFromDatabase, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
