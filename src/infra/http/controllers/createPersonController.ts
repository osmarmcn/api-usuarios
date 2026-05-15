import {
  NextFunction,
  Request,
  Response,
} from 'express'



import { createPersonSchema } from '@/infra/http/schemas/create-person-schema'
import { makeCreatePersonUseCase } from '@/infra/factories/person-factory'

export class CreatePersonController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const body = createPersonSchema.parse(request.body)

      const createPersonUseCase = makeCreatePersonUseCase()

      const person = await createPersonUseCase.execute(body)

      return response.status(201).json(person)
    } catch (error) {
      next(error)
    }
  }
}