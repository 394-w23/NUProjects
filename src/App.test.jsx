import {describe, expect, test} from 'vitest';
import {fireEvent, render, screen} from '@testing-library/react';
import Root from './Root';

describe('initial test', () => {
    
  test("Home on nav bar should be defined", () => {
    render(<Root />);
    expect(screen.getByText('Home')).toBeDefined();
  });

});