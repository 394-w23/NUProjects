import React from "react";
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

describe("Navigation", () => {

  test("renders the Home page by default", () => {
    useDbData.mockReturnValue([mockData, null]);
    useAuth.mockReturnValue({displayName : "Test User"});
    render(
      <MemoryRouter initialEntries={["/"]}>
        <NavbarApp />
        <Routes />
      </MemoryRouter>
    );
    
    // screen.debug();

    expect(screen.queryByText('Sort by date posted')).toBeInTheDocument();
    expect(screen.queryByText('Profile')).toBeNull();
    expect(screen.queryByText('Saved')).toBeNull();
    expect(screen.queryByText('Applied')).toBeNull();

    });

    test("navigates to home page when logo is clicked", () => {
        useDbData.mockReturnValue([mockData, null]);
        useAuth.mockReturnValue({displayName : "Test User"});
        const { getAllByTestId, getByTestId, getByText } = render(
          <MemoryRouter initialEntries={["/"]}>
            <NavbarApp />
            <Routes />
          </MemoryRouter>
        );

        screen.debug();

        const goHomeLink = getByText('NUProjects');
        goHomeLink.dispatchEvent(new MouseEvent("click", { bubbles: true }));

        expect(screen.queryByText('Sort by date posted')).toBeInTheDocument();
        expect(screen.queryByText('Profile')).toBeNull();
        expect(screen.queryByText('Saved')).toBeNull();
        expect(screen.queryByText('Applied')).toBeNull();
    });
     

  });