import {describe, expect, test, it, vi} from 'vitest';
import {fireEvent, getByTestId, render, screen, waitFor} from '@testing-library/react';
import CardPageApp from '../components/CardPage/CardPage';
import { useDbData } from '../utilities/firebase';
import { useAuth } from "../hooks/useAuth";
import * as mockData from "./mockdata/nuprojects-37022-default-rtdb-export.json";

vi.mock('../utilities/firebase')
vi.mock('../hooks/useAuth')

describe('Filtering1 tests', () => {

    test('cards should be filtered by the "Azure", the skills selected', () => {
        useDbData.mockReturnValue([mockData, null]);
        useAuth.mockReturnValue({displayName : "Test User"})
        const { getAllByTestId, getByTestId }= render(<CardPageApp />);
        let cards_unfiltered = []
        const cardElements = getAllByTestId("card_skills");
        for (let i = 0; i < cardElements.length; i++) {
            // Add only the cards with Azure in the skills 
            if(cardElements[i].innerHTML.includes('Azure')){
                cards_unfiltered.push(cardElements[i].innerHTML)
            }
        }
        const dropdown = getByTestId('filtering-button')
        fireEvent.change(dropdown, { target: { value: 'Azure' } });
        const cardElements_filtered= getAllByTestId("card_skills");
        let cards_filtered = []
        // Add all the cards displayed
        for (let i = 0; i < cardElements_filtered.length; i++) {   
                cards_filtered.push(cardElements[i].innerHTML)
        }
        // the length of both arrays should be the same
        expect(cards_filtered.length===cards_unfiltered.length).toBeTruthy();
    });

    test('cards should be filtered by the "Agile", the skills selected', () => {
        useDbData.mockReturnValue([mockData, null]);
        useAuth.mockReturnValue({displayName : "Test User"})
        const { getAllByTestId, getByTestId }= render(<CardPageApp />);
        let cards_unfiltered = []
        const cardElements = getAllByTestId("card_skills");
        for (let i = 0; i < cardElements.length; i++) {
            // Add only the cards with Azure in the skills 
            if(cardElements[i].innerHTML.includes('Agile')){
                cards_unfiltered.push(cardElements[i].innerHTML)
            }
        }
        const dropdown = getByTestId('filtering-button')
        fireEvent.change(dropdown, { target: { value: 'Agile' } });
        const cardElements_filtered= getAllByTestId("card_skills");
        let cards_filtered = []
        // Add all the cards displayed
        for (let i = 0; i < cardElements_filtered.length; i++) {   
                cards_filtered.push(cardElements[i].innerHTML)
        }
        // the length of both arrays should be the same
        expect(cards_filtered.length===cards_unfiltered.length).toBeTruthy();
    });
});
  