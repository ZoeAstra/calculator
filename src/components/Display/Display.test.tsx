import React from 'react';
import { render, screen } from '@testing-library/react';
import Display from './Display';

test('Display input exists', () => {
  render(<Display disable={false} value='test' handleChange={() => undefined} />)
  const displayElement = screen.getByTestId("displayInput")
  expect(displayElement).toBeInTheDocument()
});