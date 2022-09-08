import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'

import LineChartWithInput, { DEFAULT_INTEREST_RATE } from '../index'
import SavingsAPI from '../../../apis/savings'

jest.mock('react-chartjs-2', () => ({
  Line: () => null,
}))

jest.mock('chart.js', () => ({
  Chart: {
    register: () => null,
  },
  registerables: [],
}))

SavingsAPI.projection = jest.fn(() => [0, 1, 2, 3, 4, 5])

afterAll(() => {
  jest.resetAllMocks()
})

afterEach(() => {
  SavingsAPI.projection.mockClear()
})

describe('LineChartWithInput', () => {
  it('should render and fetch data with default input', async () => {
    await waitFor(() => render(<LineChartWithInput />))

    expect(SavingsAPI.projection).toHaveBeenCalledTimes(1)
    expect(screen.getByDisplayValue(DEFAULT_INTEREST_RATE).toBeInTheDocument)
  })

  it('should debounce effect on input value changes', async () => {
    await waitFor(() => render(<LineChartWithInput />))

    const input = screen.getByDisplayValue(DEFAULT_INTEREST_RATE)

    fireEvent.change(input, { target: { value: '2.0' } })
    expect(input.value).toBe('2.0')

    fireEvent.change(input, { target: { value: '3.0' } })
    expect(input.value).toBe('3.0')

    fireEvent.change(input, { target: { value: '-3.0' } })
    expect(input.value).toBe('-3.0')

    expect(SavingsAPI.projection).toHaveBeenCalledTimes(1)
  })
})
