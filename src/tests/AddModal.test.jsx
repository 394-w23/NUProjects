import {describe, expect, test, it, vi} from 'vitest';
import {fireEvent, getAllByRole, getByRole, render, screen, waitFor, queryAllByTestId, getByTestId} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CardPageApp from '../components/CardPage/CardPage';
import AddButtonApp from '../components/AddButton/AddButton';
import { useDbData } from '../utilities/firebase';
import { useAuth } from "../hooks/useAuth";
import * as mockData from "./mockdata/nuprojects-37022-default-rtdb-export.json";
import AddModal from '../components/AddModal/AddModal';
import CardApp from '../components/CardPage/Card';

vi.mock('../utilities/firebase')
vi.mock('../hooks/useAuth')

describe('AddModal tests', () => {
    let container;
    beforeEach(() => {
        useDbData.mockReturnValue([mockData, null]);
        useAuth.mockReturnValue({ displayName: 'Test User' });
        container = render(<AddButtonApp />).container;
    });

    test('should display the button to open add modal', async () => {
        const addBtn = await screen.getByTestId('addBtn');
        expect(addBtn.textContent).toContain("Add New Position Listing")
    });

    // test('AddModal displays correctly', () => {
    //     useDbData.mockReturnValue([mockData, null]);
    //     useAuth.mockReturnValue({ displayName: 'Test User' });
    //     const { getByTestId, getAllByTestId } = render(<AddModal show={true}/>);
    //     const modalHeader = getByTestId('modal-header');
    //     expect(modalHeader.textContent).toContain("Create new project")
    // });

    test('should show AddModal when button is clicked', async () => {

        let addBtn = await screen.getByTestId('addBtn');
        
        await userEvent.click(addBtn)
        const modalHeader = await screen.getByTestId("modal-header")

        expect(modalHeader.textContent).toContain("Create new project")
    });


    test('All forms fields appear', async () => {
        let addBtn = await screen.getByTestId('addBtn');
        
        await userEvent.click(addBtn)
        const modalHeader = await screen.getByTestId("modal-header")
        expect(modalHeader.textContent).toContain("Create new project")

        const form = await screen.getByTestId("add-modal-form")
        console.log(form)
        expect(form.children.length).toBe(11)
    });

});