import { Router } from 'express'
import { CreatePersonController } from '@/infra/http/controllers/createPersonController'
import { GetPeopleController } from '../controllers/getPeopleController'
import { GetPersonByIdController } from '../controllers/getPersonBnyIdController'
import { UpdatePersonController } from '../controllers/updatePersonController'
import { DeletePersonController } from '../controllers/deletePersonController'

const personRoutes = Router()

const createPersonController = new CreatePersonController()
const getPeopleController = new GetPeopleController()
const getPersonByIdController = new GetPersonByIdController()
const updatePersonController = new UpdatePersonController()
const deletePersonController = new DeletePersonController()

personRoutes.post('/', (req, res, next) => createPersonController.handle(req, res, next))

personRoutes.get('/', (req, res, next) => getPeopleController.handle(req, res, next))

personRoutes.get('/:id', (req, res, next) => getPersonByIdController.handle(req, res, next))

personRoutes.patch('/:id',(req, res, next) => updatePersonController.handle(req,res,next,))

personRoutes.delete('/:id',(req, res, next) => deletePersonController.handle(req,res,next,))

export { personRoutes }