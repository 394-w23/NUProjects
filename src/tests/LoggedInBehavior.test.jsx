import React from "react";
import { beforeEach } from 'vitest'
import '@testing-library/jest-dom'
import { MemoryRouter, Route } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import NavbarApp from "../components/Navbar/Navbar";
import CardPageApp from "../components/CardPage/CardPage";
import Routes from "../Routes";
import { useDbData } from '../utilities/firebase';
import { useAuth } from "../hooks/useAuth";
import * as mockData from "./mockdata/nuprojects-37022-default-rtdb-export.json";

vi.mock('../utilities/firebase')
vi.mock('../hooks/useAuth')

describe("Navigation", () => {

    beforeEach(async () => {
        useDbData.mockReturnValue([mockData, null]);
        useAuth.mockReturnValue([{name : "Test User"}])
      })

    test("doesn't allow user to click on 'add new position listing' button when not logged in", () => {
        render(<CardPageApp />);
        screen.debug();
        expect(screen.queryByText('Add New Position Listing')).toBeDisabled();

    });

    test("allows user to click on 'add new position listing' button when logged in", () => {
      render(<CardPageApp />);
      expect(screen.queryByText('Add New Position Listing')).toBeTruthy();

  });


  });