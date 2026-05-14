
import { AppError } from '@/core/errors/app-error'

import { Person } from '@/domain/entities/person'

import { IPersonRepository } from '@/domain/repositories/person-repository'

interface GetPersonByIdRequest {
  id: string
}

export class GetPersonByIdUseCase {
  constructor(
    private personRepository: IPersonRepository,
  ) {}

  async execute({id}: GetPersonByIdRequest): Promise<Person> {
    const person = await this.personRepository.findById(id)

    if (!person) {
      throw new AppError('Person not found',404,)
    }

    return person
  }
}