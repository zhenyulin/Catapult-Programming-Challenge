import { ProjectionInputTypes } from '../../types/savings'

export const monthlyDepositAccumulated = (
  { initial, deposit, interestRate }: ProjectionInputTypes,
  years: number = 50,
) => {
  const data = []

  // calculate year end's saving with monthly deposit
  // assuming the deposit is made at the end of each month
  // and use simple monthly interest rate of dividing yearly rate by 12
  //
  // Pi denotes the accumulated saving at the end of i month in a year
  // P0 = init
  // P1 = P0 * (1+r) + deposit
  // P2 = P1 * (1+r) + deposit = P0 * (1+r) ** 2 + deposit * ((1+r)**0 + (1+r)**1)
  // ...
  // Pi = P0 * (1+r) ** i + deposit * ((1+r)**0 + (1+r)**(i-1)) [proportional sequence]
  //    = P0 * (1+r) ** i + deposit * ((1+r)**i - 1) / r
  //
  // P12 = P0 * (1+r) ** 12 + deposit * ((1+r) ** 12 - 1) / r
  //
  // which is the predicted accumulated saving at the end of the year
  //
  // here we can name a = (1+r) ** 12, b = ((1+r) ** 12 - 1) / r
  // P12 = initial * a + deposit * b

  const r = interestRate / 100 / 12 // simple monthly interest rate
  const a = (1 + r) ** 12
  const b = r ? (a - 1) / r : 12

  let temp: number = initial

  for (let i = 0; i < years + 1; i += 1) {
    data.push(temp)
    temp = temp * a + deposit * b
  }

  return data
}

export default { monthlyDepositAccumulated }
