import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';

describe('Saving a job', () => {
  it('should add the job to the "Jobs Saved" page', async () => {
    // Mock the fetch API
    const mockResponse = { status: 200, body: { id: 123, title: 'Job Title' } };
    global.fetch = jest.fn(() => Promise.resolve(mockResponse));

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

    // Assert that the fetch API was called with the correct arguments
    expect(global.fetch).toHaveBeenCalledWith('/api/save-job', {
      method: 'POST',
      body: JSON.stringify({ id: 123, title: 'Job Title' }),
      headers: { 'Content-Type': 'application/json' }
    });

    // Assert that the saved job is on the "Jobs Saved" page
    const savedJobs = await screen.findAllByTestId('saved-job');
    expect(savedJobs.length).toBe(1);
    expect(savedJobs[0]).toHaveTextContent('Job Title');

    // Clean up
    delete global.fetch;
  });
});

