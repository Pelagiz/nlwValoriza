import 'reflect-metadata'
import './database'
import 'express-async-errors'

import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { router } from './routes'

const app = express()
app.use(express.json())
app.use(cors())

app.use(router)

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
      return response.status(400).json({
        error: err.message
      })
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal Server Error'
    })
  }
)

app.listen(8000, () => console.log('Server is Running!'))
