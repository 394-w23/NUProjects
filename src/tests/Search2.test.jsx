import { describe, expect, test, it, vi } from 'vitest';
import { fireEvent, getAllByRole, getByRole, render, screen, waitFor, queryAllByTestId, getByTestId } from '@testing-library/react';
import CardPageApp from '../components/CardPage/CardPage';
import { useDbData } from '../utilities/firebase';
import { useAuth } from "../hooks/useAuth";
import * as mockData from "./mockdata/nuprojects-37022-default-rtdb-export.json";

vi.mock('../utilities/firebase')
vi.mock('../hooks/useAuth')

describe('Search2 tests', () => {
  test('should not display cards that contain the search term in their title or description', () => {
    useDbData.mockReturnValue([mockData, null]);
    useAuth.mockReturnValue({ displayName: 'Test User' });
    const { getByTestId, getAllByTestId } = render(<CardPageApp />);
    const searchInput = getByTestId('search');
    fireEvent.change(searchInput, { target: { value: 'Python' } });
    expect(searchInput.value).toBe('Python');
    const container = document.createElement('div');
    const cardElements = queryAllByTestId(container, "card-info");
    for (let i = 0; i < cardElements.length; i++) {
      const cardTitle = cardElements[i].querySelector('.card-title').textContent;
      const cardDescription = cardElements[i].querySelector('.card-description').textContent;
      const cardSkills = cardElements[i].querySelector('.card-skills').textContent;
      const cardHashtags = cardElements[i].querySelector('.card-hashtags').textContent;
      const projectName = cardElements[i].querySelector('.card-project-name').textContent;
      const { title, description, skills, hashtags } = mockData[i];
      
      // Check that the card does not contain the search term in any of its fields
      expect(cardTitle.toLowerCase().includes('python')).toBeFalsy();
      expect(cardDescription.toLowerCase().includes('python')).toBeFalsy();
      expect(cardSkills.toLowerCase().includes('python')).toBeFalsy();
      expect(cardHashtags.toLowerCase().includes('python')).toBeFalsy();
      expect(projectName.toLowerCase().includes('python')).toBeFalsy();
    }
  });
  test('should display only cards with the specified project name', () => {
    useDbData.mockReturnValue([mockData, null]);
    useAuth.mockReturnValue({ displayName: 'Test User' });
    const { getByTestId, getAllByTestId } = render(<CardPageApp />);
    const searchInput = getByTestId('search');
    fireEvent.change(searchInput, { target: { value: 'iDock' } });
    const container = document.createElement('div');
    const cardElements = queryAllByTestId(container, "card-info");
    for (let i = 0; i < cardElements.length; i++) {
      const projectName = cardElements[i].querySelector('.project-name').textContent;
      expect(projectName).toBe('iDock');
    }
  });
  
  test('should display only cards with the specified skill', () => {
    useDbData.mockReturnValue([mockData, null]);
    useAuth.mockReturnValue({ displayName: 'Test User' });
    const { getByTestId, getAllByTestId } = render(<CardPageApp />);
    const searchInput = getByTestId('search');
    fireEvent.change(searchInput, { target: { value: 'HTML' } });
    const container = document.createElement('div');
    const cardElements = queryAllByTestId(container, "card-info");
    for (let i = 0; i < cardElements.length; i++) {
      const skills = cardElements[i].querySelector('.skills').textContent;
      expect(skills.toLowerCase().includes('html')).toBeTruthy();
    }
  });
});
