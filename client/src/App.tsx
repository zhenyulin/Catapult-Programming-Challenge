import React from 'react'
import './App.css'
import { ChakraProvider, Container } from '@chakra-ui/react'
import DefaultLayout from './components/layouts/Default'
import LineChartWithInput from './components/LineChartWithInput'

function App() {
  return (
    <ChakraProvider>
      {/* We've just bundled everything into one file here to
            get you started!*/}
      <DefaultLayout>
        <Container pt={6}>
          <LineChartWithInput />
        </Container>
      </DefaultLayout>
    </ChakraProvider>
  )
}

export default App
