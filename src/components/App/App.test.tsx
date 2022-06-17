import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('App element exists', () => {
  render(<App />);
  // const displayElement = screen.get;
  // expect(displayElement).toBeInTheDocument();
});
