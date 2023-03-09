import {describe, expect, test} from 'vitest';
import {fireEvent, render, screen} from '@testing-library/react';
import App from './App';

describe('unit tests', () => {

  test("Website should load", () => {
    render(<App />);
    expect(screen.getByText('Sign in')).toBeDefined();
  });


});
