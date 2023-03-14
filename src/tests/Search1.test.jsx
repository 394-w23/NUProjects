import {describe, expect, test, it, vi} from 'vitest';
import {fireEvent, getAllByRole, getByRole, render, screen, waitFor, queryAllByTestId, getByTestId} from '@testing-library/react';
import CardPageApp from '../components/CardPage/CardPage';
import { useDbData } from '../utilities/firebase';
import { useAuth } from "../hooks/useAuth";
import * as mockData from "./mockdata/nuprojects-37022-default-rtdb-export.json";

vi.mock('../utilities/firebase')
vi.mock('../hooks/useAuth')

describe('Search1 tests', () => {
    test('should display cards that contain the search term in their title or description', () => {
        useDbData.mockReturnValue([mockData, null]);
        useAuth.mockReturnValue({ displayName: 'Test User' });
        const { getByTestId, getAllByTestId } = render(<CardPageApp />);
        const searchInput = getByTestId('search');
        fireEvent.change(searchInput, { target: { value: 'React' } });
        expect(searchInput.value).toBe('React');
        const container = document.createElement('div');
        const cardElements = queryAllByTestId(container, "card-info");
        for (let i = 0; i < cardElements.length; i++) {
            const cardTitle = cardElements[i].querySelector('.card-title').textContent;
            const cardDescription = cardElements[i].querySelector('.card-description').textContent;
            expect(cardTitle.toLowerCase().includes('react') || cardDescription.toLowerCase().includes('react')).toBeTruthy();
        }
    });
    test('should update displayed cards when search input changes', () => {
        useDbData.mockReturnValue([mockData, null]);
        useAuth.mockReturnValue({ displayName: 'Test User' });
        const { getByTestId, getAllByTestId } = render(<CardPageApp />);
        const searchInput = getByTestId('search');
        fireEvent.change(searchInput, { target: { value: 'React' } });
        expect(searchInput.value).toBe('React');
        const cardElements = getAllByTestId('card-info');
        expect(cardElements.length).toBe(1); // There should be two cards with 'React' in their title or description
    });
    test('should be case-insensitive when searching for cards', () => {
        useDbData.mockReturnValue([mockData, null]);
        useAuth.mockReturnValue({ displayName: 'Test User' });
        const { getByTestId, getAllByTestId } = render(<CardPageApp />);
        const searchInput = getByTestId('search');
        fireEvent.change(searchInput, { target: { value: 'react' } });
        expect(searchInput.value).toBe('react');
        const cardElements = getAllByTestId('card-info');
        expect(cardElements.length).toBe(1); // There should be two cards with 'React' in their title or description
    });
    test('should not clear all cards when search input is cleared', () => {
        useDbData.mockReturnValue([mockData, null]);
        useAuth.mockReturnValue({ displayName: 'Test User' });
        const { getByTestId, getAllByTestId } = render(<CardPageApp />);
        const searchInput = getByTestId('search');
        fireEvent.change(searchInput, { target: { value: 'React' } });
        expect(searchInput.value).toBe('React');
        fireEvent.change(searchInput, { target: { value: '' } });
        const cardElements = getAllByTestId('card-info');
        expect(cardElements.length).toBeGreaterThan(0); // There should be two cards with 'React' in their title or description
    });
});