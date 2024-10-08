import React from "react";
import { beforeEach } from 'vitest'
import '@testing-library/jest-dom'
import { MemoryRouter, Route } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import NavbarApp from "../components/Navbar/Navbar";
import Routes from "../Routes";
import { useDbData } from '../utilities/firebase';
import { useAuth } from "../hooks/useAuth";
import * as mockData from "./mockdata/nuprojects-37022-default-rtdb-export.json";
import AddModal from "../components/AddModal/AddModal";
// import { isEmpty } from "cypress/types/lodash";
vi.mock('../utilities/firebase')
vi.mock('../hooks/useAuth')


  useDbData.mockReturnValue([mockData, null]);
  useAuth.mockReturnValue({users: {name : "Test User"}, setUserFromDatabase: () => "hi" });
describe("Testing routes", () => {


  test("renders the Home page by default when logged in", () => {
    useAuth.mockReturnValue({user: {name : "Test User"}, setUserFromDatabase: () => "hi" });

    render(
      <MemoryRouter initialEntries={["/"]}>
        <NavbarApp />
        <Routes />
      </MemoryRouter>
    );

    screen.debug()
    // can not find sign in 
    expect(screen.queryByText('Sign in')).not.toBeInTheDocument();
    expect(screen.queryByText('Profile')).toBeNull();
    expect(screen.queryByText('Saved')).toBeNull();
    expect(screen.queryByText('Applied')).toBeNull();

    });

    test("navigates to home page when user disconnected", () => {
      useAuth.mockReturnValue({"000": {name : "Test User"}, setUserFromDatabase: () => "hi" });
        const { getByText } = render(
          <MemoryRouter initialEntries={["/"]}>
            <NavbarApp />
            <Routes />
          </MemoryRouter>
        );
        expect(screen.queryByText('Sign in')).toBeInTheDocument();
        expect(screen.queryByText('Profile')).toBeNull();

    });

    test("navigates to profile when not connected", () => {
        const { getByText } = render(
            <MemoryRouter initialEntries={["/profile"]}>
                <NavbarApp />
                <Routes />
            </MemoryRouter>
        );
        // only expect navbar to be rendered
        expect(screen.queryByText('Sign in')).toBeInTheDocument();
        // expect user - card classs not to be there
        expect(screen.queryByText('user-card')).toBeNull();

    });

    test("navigates to profile when  connected", () => {
      useAuth.mockReturnValue({user: {name : "Test User"}, setUserFromDatabase: () => "hi" });
      const { getByText } = render(
          <MemoryRouter initialEntries={["/profile"]}>
              <NavbarApp />
              <Routes />
          </MemoryRouter>
      );
      // only expect navbar to be rendered
      expect(screen.queryByText('Sign in')).not.toBeInTheDocument();
      expect(screen.queryByText('Test User')).toBeInTheDocument();
      // expect user - card classs not to be there
      expect(screen.queryByText('user-card')).toBeDefined();

  });

    test("trying to see applied project when not connected", () => {
      useAuth.mockReturnValue({user0: {name : "Test User"}, setUserFromDatabase: () => "hi" });
        const { getByText } = render(
            <MemoryRouter initialEntries={["/applied"]}>
                <NavbarApp />
                <Routes />
                </MemoryRouter>
                                
        );     
        expect(screen.queryByText('Sign in')).toBeInTheDocument();
        // "Applied" should not be there
        expect(screen.queryByText('Applied')).toBeNull();
    });

    test("trying to submit project when not connected throws error", () => {
        // get AddModal component
        const { getByText } = render(
            <AddModal />
        );
        screen.debug();

        //expect screen to be empty
        expect(screen.queryByText('Create new project')).toBeNull();

        // can't find submit button
        expect(screen.queryByText('Submit')).toBeNull();
    });




  });
