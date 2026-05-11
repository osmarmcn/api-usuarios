
import { Request, Response } from 'express'

import { PersonRepository } from '@/infra/database/repositories/person-repository'

import { CreatePersonUseCase } from '@/domain/use-cases/create-person-use-case'

export class CreatePersonController {
  async handle(request: Request, response: Response) {
    const {
      name,
      email,
      cpf,
      phone,
      address,
      gender,
      profession,
      education,
    } = request.body

    const personRepository = new PersonRepository()

    const createPersonUseCase =
      new CreatePersonUseCase(personRepository)

    const person = await createPersonUseCase.execute({
      name,
      email,
      cpf,
      phone,
      address,
      gender,
      profession,
      education,
    })

    return response.status(201).json(person)
  }
}