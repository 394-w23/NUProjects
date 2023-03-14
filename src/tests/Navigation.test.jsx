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

vi.mock('../utilities/firebase')
vi.mock('../hooks/useAuth')

const testProfile = {
    displayName: "testUser",
    email: "testUser@northwestern.edu",
    profilePic: "https://illustoon.com/photo/590.png",
  };

describe("Navigation", () => {

    beforeEach(async () => {
        useDbData.mockReturnValue([mockData, null]);
        useAuth.mockReturnValue([{name : "Test User"}])
      })

  test("renders the Home page by default", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <NavbarApp />
        <Routes />
      </MemoryRouter>
    );

    screen.debug();

    expect(screen.queryByText('Sort by date posted')).toBeInTheDocument();
    expect(screen.queryByText('Profile')).toBeNull();
    expect(screen.queryByText('Saved')).toBeNull();
    expect(screen.queryByText('Applied')).toBeNull();

    });

    test("navigates to home page when logo is clicked", () => {
        const { getByText } = render(
          <MemoryRouter initialEntries={["/"]}>
            <NavbarApp />
            <Routes />
          </MemoryRouter>
        );

        screen.debug();

        const link = getByText('NUProjects');
        link.dispatchEvent(new MouseEvent("click", { bubbles: true }));

        expect(screen.queryByText('Sort by date posted')).toBeInTheDocument();
        expect(screen.queryByText('Profile')).toBeNull();
        expect(screen.queryByText('Saved')).toBeNull();
        expect(screen.queryByText('Applied')).toBeNull();
    });

    test("navigates to profile page", () => {
        const { getByText } = render(
          <MemoryRouter initialEntries={["/profile"]}>
            <NavbarApp />
            <Routes />
          </MemoryRouter>
        );
        expect(screen.queryByText('Sort by date posted')).toBeNull();
        expect(screen.queryByText('Profile'));
        expect(screen.queryByText('Saved')).toBeNull();
        expect(screen.queryByText('Applied')).toBeNull();
    });

    test("navigates to saved page", () => {
        const { getByText } = render(
          <MemoryRouter initialEntries={["/saved"]}>
            <NavbarApp />
            <Routes />
          </MemoryRouter>
        );
        expect(screen.queryByText('Sort by date posted')).toBeNull();
        expect(screen.queryByText('Profile')).toBeNull();
        expect(screen.queryByText('Saved'));
        expect(screen.queryByText('Applied')).toBeNull();
    });

    test("navigates to applied page", () => {
        const { getByText } = render(
          <MemoryRouter initialEntries={["/applied"]}>
            <NavbarApp />
            <Routes />
          </MemoryRouter>
        );
        expect(screen.queryByText('Sort by date posted')).toBeNull();
        expect(screen.queryByText('Profile')).toBeNull();
        expect(screen.queryByText('Saved')).toBeNull();
        expect(screen.queryByText('Applied'));
    });

  });