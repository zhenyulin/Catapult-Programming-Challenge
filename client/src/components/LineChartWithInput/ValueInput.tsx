import React, { Dispatch, SetStateAction } from 'react'
import {
  Box,
  Stack,
  InputGroup,
  InputLeftAddon,
  Input,
  InputRightAddon,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react'

import { handleIntInput, handleFloatInput } from '../../lib/handlers'

type InputProps = {
  initial: number
  setInitial: Dispatch<SetStateAction<number>>
  deposit: number
  setDeposit: Dispatch<SetStateAction<number>>
  interestRate: number
  setInterestRate: Dispatch<SetStateAction<number>>
}

const ValueInput = ({
  initial,
  setInitial,
  deposit,
  setDeposit,
  interestRate,
  setInterestRate,
}: InputProps) => (
  <Box m={2} width={320}>
    <Stack spacing={3}>
      <InputGroup>
        <InputLeftAddon children="Initial Saving" />
        <Input value={initial} onChange={handleIntInput(setInitial)} />
      </InputGroup>
      <InputGroup>
        <InputLeftAddon children="Monthly Deposit" />
        <Input value={deposit} onChange={handleIntInput(setDeposit)} />
      </InputGroup>
      <InputGroup>
        <InputLeftAddon children="Interest Rate" />
        <NumberInput
          precision={2}
          value={interestRate}
          onChange={handleFloatInput(setInterestRate)}
        >
          <NumberInputField />
        </NumberInput>
        <InputRightAddon children="%" />
      </InputGroup>
    </Stack>
  </Box>
)

export default ValueInput
