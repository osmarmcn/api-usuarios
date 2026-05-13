import express from 'express'

import { personRoutes } from '@/infra/http/routes/person-routes'
import { errorMiddleware } from './infra/http/middlewares/error-middleware'


export const app = express()

app.use(express.json())

app.use('/people', personRoutes)

app.use(errorMiddleware)

