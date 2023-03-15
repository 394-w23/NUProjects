// Write test for the Auth component
//
// Path: src/tests/Auth.test.jsx
import React from "react";
import '@testing-library/jest-dom'
import { MemoryRouter, Route } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { useAuth } from "../hooks/useAuth";
import { useDbData  } from '../utilities/firebase';
import NavbarApp from "../components/Navbar/Navbar";
import Routes from "../Routes";
import * as mockData from "./mockdata/nuprojects-37022-default-rtdb-export.json";
import { signInCy } from "../utilities/firebase";
import { initializeApp } from "firebase/app";

import {
    signInWithEmailAndPassword,
    getAuth,
    signOut as firebaseSignOut
  } from "firebase/auth";

vi.mock('../utilities/firebase')
vi.mock('../hooks/useAuth')

const firebaseConfig = {
    apiKey: "AIzaSyABFVW-AgGP6OrHMrHnYSBD4dWv19fMjFY",
    authDomain: "nuprojects-37022.firebaseapp.com",
    databaseURL: "https://nuprojects-37022-default-rtdb.firebaseio.com",
    projectId: "nuprojects-37022",
    storageBucket: "nuprojects-37022.appspot.com",
    messagingSenderId: "895929247438",
    appId: "1:895929247438:web:651215d43228c05bef929f",
    REACT_APP_EMULATE: true
  };

  
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

describe("Auth", () => {

    test("renders the Auth page by default", () => {
        useDbData.mockReturnValue([mockData, null]);
        useAuth.mockReturnValue({ displayName: "Test User" });
        render(
            <MemoryRouter initialEntries={["/"]}>
                <NavbarApp />
                <Routes />
            </MemoryRouter>
        );

        // screen.debug();
        expect(screen.queryByText('Sign in')).toBeInTheDocument();
        // click on Sign in 
    });

    //test sign in and check data returned for user
    test("sign in and check data returned for user", async () => {
        useDbData.mockReturnValue([mockData, null]);
        useAuth.mockReturnValue({ displayName: "Test User" });
        

        render(
            <MemoryRouter initialEntries={["/"]}>
                <NavbarApp />
                <Routes />
            </MemoryRouter>
        );

        const user_connected = await signInWithEmailAndPassword(auth, 
            "email@email.com", "password")
            .then((userCredential) => {
              // Signed in
              const user = userCredential;
              console.log("signed in!")
              return userCredential;
              // ...
            }
          )
        console.log("user is", user_connected.user.reloadUserInfo);
        const email = user_connected.user.reloadUserInfo.email;
        const id = user_connected.user.reloadUserInfo.localId;
        //expect to be undefined at first
        // wait for promise user_connected to resolve
        // expect(user_connected).toBeDefined();
        // console.log(signInCy())
        // // expect to be defined after promise resolves
        // expect(user_connected).toBeDefined();
        // // search email, name, and userId fields exist in user_connected
        expect(email).toBe("email@email.com");
        expect(id).toBe("7fSFgiz5wlMlyN9kD64gVBSSseu2");
        

    });

    //test sign out and check data returned for user
    test("sign out and check data returned for user", async () => {
        useDbData.mockReturnValue([mockData, null]);
        useAuth.mockReturnValue({ displayName: "Test User" });
        render(
            <MemoryRouter initialEntries={["/"]}>
                <NavbarApp />
                <Routes />
            </MemoryRouter>
        );

        const user_connected = await signInWithEmailAndPassword(auth, 
            "email@email.com", "password")
            .then((userCredential) => {
              // Signed in
              const user = userCredential;
              console.log("signed in!")
              return userCredential;
              // ...
            }
          );
          console.log('signed in!', user_connected);

        expect(user_connected).toBeDefined();
        const result = firebaseSignOut(auth);
        // expect result to be promise
        expect(result).toBeInstanceOf(Promise);

        

    });



});