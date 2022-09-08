import { monthlyDepositAccumulated } from '../savings'

describe('monthlyDepositAccumulated', () => {
  it('should return correct projection for positive interest rate', () => {
    const expected = []

    const initial = 100
    const deposit = 10
    const interestRate = 10
    const years = 10

    const r = interestRate / 100 / 12

    let temp: number = initial

    for (let i = 0; i < years + 1; i += 1) {
      expected.push(temp)
      for (let j = 0; j < 12; j += 1) {
        temp = temp * (1 + r) + deposit
      }
    }

    const result = monthlyDepositAccumulated({ initial, deposit, interestRate }, years)

    expect(expected.length).toEqual(result.length)

    for (let i = 0; i < expected.length; i += 1) {
      expect(expected[i]).toBeCloseTo(result[i])
    }
  })

  it('should return correct projection for negative interest rate', () => {
    const expected = []

    const initial = 100
    const deposit = 10
    const interestRate = -10
    const years = 10

    const r = interestRate / 100 / 12

    let temp: number = initial

    for (let i = 0; i < years + 1; i += 1) {
      expected.push(temp)
      for (let j = 0; j < 12; j += 1) {
        temp = temp * (1 + r) + deposit
      }
    }

    const result = monthlyDepositAccumulated({ initial, deposit, interestRate }, years)

    expect(expected.length).toEqual(result.length)

    for (let i = 0; i < expected.length; i += 1) {
      expect(expected[i]).toBeCloseTo(result[i])
    }
  })

  it('should return correct projection for zero interest rate', () => {
    expect(monthlyDepositAccumulated({ initial: 0, deposit: 0, interestRate: 0 }, 5)).toEqual([
      0,
      0,
      0,
      0,
      0,
      0,
    ])

    expect(monthlyDepositAccumulated({ initial: 10, deposit: 0, interestRate: 0 }, 5)).toEqual([
      10,
      10,
      10,
      10,
      10,
      10,
    ])

    expect(monthlyDepositAccumulated({ initial: 0, deposit: 10, interestRate: 0 }, 5)).toEqual([
      0,
      120,
      240,
      360,
      480,
      600,
    ])
  })
})
