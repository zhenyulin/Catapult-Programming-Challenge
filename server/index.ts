import express from 'express'
import cors from 'cors'

import SavingsAPI from './apis/savings'

const app = express()

const port = process.env.PORT || 3001

if (process.env.NODE_ENV === 'production') {
  // Express only serves static assets in production
  app.use(express.static('client/build'))
} else {
  // Relax cors policy in development environment
  app.use(cors({ origin: '*' }))
}

app.get('/savings/projection', SavingsAPI.projection)

app.listen(port, () => {
  console.log(`Find the server at: http://localhost:${port}/`) // eslint-disable-line no-console
})
