
import { Router } from 'express'

import { CreatePersonController } from '@/infra/http/controllers/create-person-controller'
import { GetPeopleController } from '../controllers/get-people-controller'

const personRoutes = Router()

const createPersonController = new CreatePersonController()
const getPeopleController = new GetPeopleController()

personRoutes.post(
  '/',
  createPersonController.handle,
)
personRoutes.get('/', getPeopleController.handle)

export { personRoutes }