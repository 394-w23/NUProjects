import {describe, expect, test, it, vi} from 'vitest';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import CardPageApp from '../components/CardPage/CardPage';
import { useDbData } from '../utilities/firebase';
import { useAuth } from "../hooks/useAuth";
import * as mockData from "./mockdata/nuprojects-37022-default-rtdb-export.json";

vi.mock('../utilities/firebase')
vi.mock('../hooks/useAuth')

describe('Sorting1 tests', () => {

    test('cards should be sorted by start date (in increasing order) when "sort by start date" selected', () => {
        useDbData.mockReturnValue([mockData, null]);
        useAuth.mockReturnValue({displayName : "Test User"})
        const { getAllByTestId, getByTestId, getByText } = render(<CardPageApp />);
        const dropdown = getByTestId('sorting-button')
        fireEvent.change(dropdown, { target: { value: 'projectStartDate' } });
        fireEvent.click(dropdown)
        const option = getByText('Sort by start date')
        fireEvent.click(option)
        const cardElements = getAllByTestId("card-info");
        const seeMoreButtons = getAllByTestId("see-more-button");
        let num_cards = cardElements.length
        for (let i = 0; i < num_cards; i++) {
            fireEvent.click(seeMoreButtons[i])
        }
        const start_dates = getAllByTestId('start-date')
        for (let i = 1; i < start_dates.length; i++) {
            let prev_date = start_dates[i-1].innerHTML.slice(27)
            let curr_date = start_dates[i].innerHTML.slice(27)
            expect(prev_date <= curr_date).toBeTruthy();
        }
    });

    test('failure for the previous start date test', () => {
        useDbData.mockReturnValue([mockData, null]);
        useAuth.mockReturnValue({displayName : "Test User"})
        const { getAllByTestId, getByTestId, getByText } = render(<CardPageApp />);
        const dropdown = getByTestId('sorting-button')
        fireEvent.change(dropdown, { target: { value: 'projectStartDate' } });
        fireEvent.click(dropdown)
        const option = getByText('Sort by start date')
        fireEvent.click(option)
        const cardElements = getAllByTestId("card-info");
        const seeMoreButtons = getAllByTestId("see-more-button");
        let num_cards = cardElements.length
        for (let i = 0; i < num_cards; i++) {
            fireEvent.click(seeMoreButtons[i])
        }
        const start_dates = getAllByTestId('start-date')
        var list_of_dates = []
        var fake_list_of_dates = []
        for (let i = 0; i < cardElements.length; i++) {
            list_of_dates.push(new Date(start_dates[i].innerHTML.slice(27)))
            fake_list_of_dates.push(new Date())
        }
        expect(list_of_dates === list_of_dates).toBeTruthy()
        expect(list_of_dates === fake_list_of_dates).toBeFalsy() // broken code should fail
    });

    test('cards should be sorted by end date (in increasing order) when "sort by end date" selected', () => {
        useDbData.mockReturnValue([mockData, null]);
        useAuth.mockReturnValue({displayName : "Test User"})
        const { getAllByTestId, getByTestId, getByText } = render(<CardPageApp />);
        const dropdown = getByTestId('sorting-button')
        fireEvent.change(dropdown, { target: { value: 'projectEndDate' } });
        fireEvent.click(dropdown)
        const option = getByText('Sort by end date')
        fireEvent.click(option)
        const cardElements = getAllByTestId("card-info");
        const seeMoreButtons = getAllByTestId("see-more-button");
        let num_cards = cardElements.length
        for (let i = 0; i < num_cards; i++) {
            fireEvent.click(seeMoreButtons[i])
        }
        const end_dates = getAllByTestId('end-date')
        for (let i = 1; i < end_dates.length; i++) {
            let prev_date = end_dates[i-1].innerHTML.slice(25)
            let curr_date = end_dates[i].innerHTML.slice(25)
            expect(prev_date <= curr_date).toBeTruthy();
        }
    });

    test('failure for the previous end date test', () => {
        useDbData.mockReturnValue([mockData, null]);
        useAuth.mockReturnValue({displayName : "Test User"})
        const { getAllByTestId, getByTestId, getByText } = render(<CardPageApp />);
        const dropdown = getByTestId('sorting-button')
        fireEvent.change(dropdown, { target: { value: 'projectEndDate' } });
        fireEvent.click(dropdown)
        const option = getByText('Sort by end date')
        fireEvent.click(option)
        const cardElements = getAllByTestId("card-info");
        const seeMoreButtons = getAllByTestId("see-more-button");
        let num_cards = cardElements.length
        for (let i = 0; i < num_cards; i++) {
            fireEvent.click(seeMoreButtons[i])
        }
        const end_dates = getAllByTestId('end-date')
        var list_of_dates = []
        var fake_list_of_dates = []
        for (let i = 0; i < cardElements.length; i++) {
            list_of_dates.push(new Date(end_dates[i].innerHTML.slice(25)))
            fake_list_of_dates.push(new Date())
        }
        expect(list_of_dates === list_of_dates).toBeTruthy()
        expect(list_of_dates === fake_list_of_dates).toBeFalsy() // broken code should fail
    });
    
});