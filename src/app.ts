import express from 'express'

import { personRoutes } from '@/infra/http/routes/person-routes'

export const app = express()

app.use(express.json())

app.use('/people', personRoutes)