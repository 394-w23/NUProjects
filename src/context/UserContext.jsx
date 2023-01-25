import React, {
  useEffect,
  useMemo,
  useContext,
  useState,
  createContext,
} from "react";
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

  const value = useMemo(
    () => ({
      user,
      setUserFromDatabase,
    }),
    [user]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
