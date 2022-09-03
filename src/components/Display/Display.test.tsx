import React from 'react';
import { render, screen } from '@testing-library/react';
import Display from './Display';

test('Display exists', () => {
  render(<Display leftSide='1+1' rightSide='+4' />)
  const displayElement = screen.getByRole("math") 
  // jest cannot find the name 'display' for math, oddly. Maybe due to output/math being rare elements/roles?
  expect(displayElement).toHaveTextContent('1+1')
});