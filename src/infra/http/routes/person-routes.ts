
import { Router } from 'express'

import { CreatePersonController } from '@/infra/http/controllers/create-person-controller'

const personRoutes = Router()

const createPersonController =
  new CreatePersonController()

personRoutes.post(
  '/',
  createPersonController.handle,
)

export { personRoutes }