import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('App element exists', () => {
  render(<App />);
  const appElement = screen.getByRole("main")
  expect(appElement).toBeInTheDocument()
})

test('Buttons produce output', async () => {
  render(<App />);
  const oneButton = await screen.findByRole("button", {name: /1/i})
  const display = await screen.findByRole("math")
  fireEvent.click(oneButton)
  expect(display).toHaveTextContent("1")
})

test('1+1=2', async () => {
  render(<App />);
  const oneButton = await screen.findByRole("button", {name: /1/i})
  const plusButton = await screen.findByRole("button", {name: /\+/i})
  const equalButton = await screen.findByRole("button", {name: /\=/i})
  const display = await screen.findByRole("math")
  fireEvent.click(oneButton)
  fireEvent.click(plusButton)
  fireEvent.click(oneButton)
  fireEvent.click(equalButton)
  expect(display).toHaveTextContent("2")
})

test('1--3=4', async () => {
  render(<App />);
  const oneButton = await screen.findByRole("button", {name: /1/i})
  const threeButton = await screen.findByRole("button", {name: /3/i})
  const minusButton = await screen.findByRole("button", {name: /\-/i})
  const equalButton = await screen.findByRole("button", {name: /\=/i})
  const display = await screen.findByRole("math")
  fireEvent.click(oneButton)
  fireEvent.click(minusButton)
  fireEvent.click(minusButton)
  fireEvent.click(threeButton)
  fireEvent.click(equalButton)
  expect(display).toHaveTextContent("4")
})

test('7*(1+3)=21', async () => {
  render(<App />);
  const oneButton = await screen.findByRole("button", {name: /1/i})
  const threeButton = await screen.findByRole("button", {name: /3/i})
  const sevenButton = await screen.findByRole("button", {name: /7/i})
  const leftParenButton = await screen.findByRole("button", {name: /\(/i})
  const rightParenButton = await screen.findByRole("button", {name: /\)/i})
  const plusButton = await screen.findByRole("button", {name: /\+/i})
  const timesButton = await screen.findByRole("button", {name: /\*/i})
  const equalButton = await screen.findByRole("button", {name: /\=/i})
  const display = await screen.findByRole("math")
  fireEvent.click(sevenButton)
  fireEvent.click(timesButton)
  fireEvent.click(leftParenButton)
  fireEvent.click(oneButton)
  fireEvent.click(plusButton)
  fireEvent.click(threeButton)
  fireEvent.click(rightParenButton)
  fireEvent.click(equalButton)
  expect(display).toHaveTextContent("21")
})