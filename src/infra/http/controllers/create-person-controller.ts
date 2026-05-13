import {
  NextFunction,
  Request,
  Response,
} from 'express'

import { PersonRepository } from '@/infra/database/repositories/person-repository'

import { CreatePersonUseCase } from '@/domain/use-cases/create-person-use-case'

import { createPersonSchema } from '@/infra/http/schemas/create-person-schema'

export class CreatePersonController {
  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const body =
        createPersonSchema.parse(
          request.body,
        )

      const personRepository =
        new PersonRepository()

      const createPersonUseCase =
        new CreatePersonUseCase(
          personRepository,
        )

      const person =
        await createPersonUseCase.execute(
          body,
        )

      return response
        .status(201)
        .json(person)
        
    } catch (error) {

      next(error)
    }
  }
}