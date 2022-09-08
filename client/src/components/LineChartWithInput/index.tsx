import React, { useState, useEffect } from 'react'

import ValueInput from './ValueInput'
import LineChart from './LineChart'

import { useDebounce } from '../../lib/hooks'
import SavingsAPI from '../../apis/savings'

export const DEFAULT_INTEREST_RATE = 1.25

const LineChartWithInput = () => {
  const [initial, setInitial] = useState(100)
  const [deposit, setDeposit] = useState(100)
  const [interestRate, setInterestRate] = useState(DEFAULT_INTEREST_RATE)
  const [projectedValues, setProjectedValues] = useState([100, 150, 180, 210, 240, 350])
  const [years, setYears] = useState([0, 1, 2, 3, 4, 5])

  const debouncedInitial = useDebounce<number>(initial, 500)
  const debouncedDeposit = useDebounce<number>(deposit, 500)
  const debouncedInterestRate = useDebounce<number>(interestRate, 500)

  useEffect(() => {
    const fetchSavingProjection = async () => {
      const data = await SavingsAPI.projection({
        initial: debouncedInitial,
        deposit: debouncedDeposit,
        interestRate: debouncedInterestRate,
      })

      setProjectedValues(data)
      setYears(data.map((e: number, i: number) => i))
    }

    fetchSavingProjection()
  }, [debouncedInitial, debouncedDeposit, debouncedInterestRate])

  return (
    <>
      <LineChart
        title="Savings Over Time"
        xAxisData={years}
        yAxisData={projectedValues}
        xLabel="Year"
        yLabel="Projected Value"
      />
      <ValueInput
        initial={initial}
        setInitial={setInitial}
        deposit={deposit}
        setDeposit={setDeposit}
        interestRate={interestRate}
        setInterestRate={setInterestRate}
      />
    </>
  )
}

export default LineChartWithInput
