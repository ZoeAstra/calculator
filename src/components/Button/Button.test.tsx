import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from './Button';

test('Button exists', () => {
  render(<Button name='testButton' colorClass='grey-button' width={1} handleClick={() => undefined} />)
  const testButton = screen.getByRole("button", {name: /testButton/i})
  expect(testButton).toBeInTheDocument()
});