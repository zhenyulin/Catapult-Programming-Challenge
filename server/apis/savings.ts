import Express from 'express'

import { monthlyDepositAccumulated } from '../calculations/savings'

type ProjectionQueryTypes = {
  initial: string
  deposit: string
  interestRate: string
}

const projection = (
  req: Express.Request<{}, {}, {}, ProjectionQueryTypes>,
  res: Express.Response,
) => {
  const initial: number = parseInt(req.query.initial, 10)
  const deposit: number = parseInt(req.query.deposit, 10)
  const interestRate: number = parseFloat(req.query.interestRate)

  if (Number.isNaN(initial) || Number.isNaN(deposit) || Number.isNaN(interestRate)) {
    res.status(400).send('Invalid Input')
  }

  const data = monthlyDepositAccumulated({ initial, deposit, interestRate })

  res.status(200).json(data)
}

export default { projection }
