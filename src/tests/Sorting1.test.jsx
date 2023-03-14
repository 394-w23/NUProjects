import {describe, expect, test, it, vi} from 'vitest';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import CardPageApp from '../components/CardPage/CardPage';
import { useDbData } from '../utilities/firebase';
import { useAuth } from "../hooks/useAuth";
import * as mockData from "./mockdata/nuprojects-37022-default-rtdb-export.json";
import { faCropSimple } from '@fortawesome/free-solid-svg-icons';

vi.mock('../utilities/firebase')
vi.mock('../hooks/useAuth')

describe('Sorting1 test', () => {
    test('cards should be sorted by date posted (in increasing order) by default', () => {
        useDbData.mockReturnValue([mockData, null]);
        useAuth.mockReturnValue({displayName : "Test User"})
        const { getAllByTestId } = render(<CardPageApp />);
        const cardElements = getAllByTestId("card-info");
        for (let i = 1; i < cardElements.length; i++) {
            let prev_date = new Date(cardElements[i-1].innerHTML.slice(13,23))
            let curr_date = new Date(cardElements[i].innerHTML.slice(13,23))
            expect(prev_date <= curr_date).toBeTruthy();
        }
    });

    test('failure for the previous date posted test', () => {
        useDbData.mockReturnValue([mockData, null]);
        useAuth.mockReturnValue({displayName : "Test User"})
        const { getAllByTestId } = render(<CardPageApp />);
        const cardElements = getAllByTestId("card-info");
        var list_of_dates = []
        var fake_list_of_dates = []
        for (let i = 0; i < cardElements.length; i++) {
            list_of_dates.push(new Date(cardElements[i].innerHTML.slice(13,23)))
            fake_list_of_dates.push(new Date())
        }
        expect(list_of_dates === list_of_dates).toBeTruthy()
        expect(list_of_dates === fake_list_of_dates).toBeFalsy() // broken code should fail
    });

    test('cards should be sorted by application deadline (in increasing order) when "sort by application deadline" selected', () => {
        useDbData.mockReturnValue([mockData, null]);
        useAuth.mockReturnValue({displayName : "Test User"})
        const { getAllByTestId, getByTestId, getByText } = render(<CardPageApp />);
        const dropdown = getByTestId('sorting-button')
        fireEvent.change(dropdown, { target: { value: 'dateToSubmit' } });
        fireEvent.click(dropdown)
        const option = getByText('Sort by application deadline')
        fireEvent.click(option)
        const cardElements = getAllByTestId("card-info");
        for (let i = 1; i < cardElements.length; i++) {
            let prev_date = new Date(cardElements[i-1].innerHTML.slice(48,58))
            let curr_date = new Date(cardElements[i].innerHTML.slice(48,58))
            expect(prev_date <= curr_date).toBeTruthy();
        }
    });

    test("failure for the previous application deadline test", () => {
        useDbData.mockReturnValue([mockData, null]);
        useAuth.mockReturnValue({displayName : "Test User"})
        const { getAllByTestId, getByTestId, getByText } = render(<CardPageApp />);
        const dropdown = getByTestId('sorting-button')
        fireEvent.change(dropdown, { target: { value: 'dateToSubmit' } });
        fireEvent.click(dropdown)
        const option = getByText('Sort by application deadline')
        fireEvent.click(option)
        const cardElements = getAllByTestId("card-info");
        var list_of_dates = []
        var fake_list_of_dates = []
        for (let i = 0; i < cardElements.length; i++) {
            list_of_dates.push(new Date(cardElements[i].innerHTML.slice(48,58)))
            fake_list_of_dates.push(new Date())
        }
        expect(list_of_dates === list_of_dates).toBeTruthy()
        expect(list_of_dates === fake_list_of_dates).toBeFalsy() // broken code should fail
    });

});
  