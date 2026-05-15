import { Router } from 'express'
import { CreatePersonController } from '@/infra/http/controllers/create-person-controller'
import { GetPeopleController } from '../controllers/get-people-controller'
import { GetPersonByIdController } from '../controllers/get-person-by-id-controller'
import { UpdatePersonController } from '../controllers/updatePersonController'

const personRoutes = Router()

const createPersonController = new CreatePersonController()
const getPeopleController = new GetPeopleController()
const getPersonByIdController = new GetPersonByIdController()
const updatePersonController = new UpdatePersonController()


personRoutes.post('/', (req, res, next) => createPersonController.handle(req, res, next))
personRoutes.get('/', (req, res, next) => getPeopleController.handle(req, res, next))
personRoutes.get('/:id', (req, res, next) => getPersonByIdController.handle(req, res, next))

personRoutes.patch('/:id',(req, res, next) => updatePersonController.handle(req,res,next,)
)
export { personRoutes }