
import {NextFunction,Request,Response,} from 'express'
import { makeGetPersonByIdUseCase } from '@/infra/factories/person-factory'

export class GetPersonByIdController {
  async handle(
    request: Request<{ id: string }>, 
    response: Response,
    next: NextFunction
  ) {
    try {
      const { id } = request.params 
      const useCase = makeGetPersonByIdUseCase() 
      const person = await useCase.execute({ id })
      
      return response.json(person)
    } catch (error) {
      next(error)
    }
  }
}