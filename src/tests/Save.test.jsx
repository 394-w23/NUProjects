import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';

describe('Saving a job', () => {
  it('should add the job to the "Jobs Saved" page', async () => {
    // Render the app
    render(<App />);

    // Wait for the job listings to load
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
    });

    // Click on the first job listing
    const jobListings = screen.getAllByTestId('job-listing');
    fireEvent.click(jobListings[0]);

    // Click the "Save Job" button
    const saveJobBtn = screen.getByTestId('save-job-btn');
    fireEvent.click(saveJobBtn);

    // Navigate to the "Jobs Saved" page
    const jobsSavedLink = screen.getByText('Jobs Saved');
    fireEvent.click(jobsSavedLink);

    // Assert that the saved job is on the page
    const savedJobListings = screen.getAllByTestId('saved-job-listing');
    expect(savedJobListings.length).toBe(1);
    expect(savedJobListings[0]).toHaveTextContent('Job Title');
  });
});
