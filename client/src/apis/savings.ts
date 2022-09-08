import { ProjectionInputTypes } from '../../../types/savings'

const projection = async ({ initial, deposit, interestRate }: ProjectionInputTypes) => {
  console.log('api')

  const response = await fetch(
    `http://localhost:3001/savings/projection?initial=${initial}&deposit=${deposit}&interestRate=${interestRate}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
  const data = await response.json()

  return data
}

const SavingsAPI = {
  projection,
}

export default SavingsAPI
