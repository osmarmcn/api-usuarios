
import { PersonRepository } from '@/infra/database/repositories/person-repository'
import { CreatePersonUseCase } from '@/domain/use-cases/create-person-use-case'
import { GetPeopleUseCase } from '@/domain/use-cases/getPeopleUseCase'
import { GetPersonByIdUseCase } from '@/domain/use-cases/getPersonByIdUseCase'
import { UpdatePersonUseCase } from '@/domain/use-cases/updatePersonUseCase'
import { DeletePersonUseCase } from '@/domain/use-cases/deletePersonUseCase'

export function makeCreatePersonUseCase() {
  const repository = new PersonRepository()
  const useCase = new CreatePersonUseCase(repository)
  return useCase
}

export function makeGetPeopleUseCase() {
  const repository = new PersonRepository()
  const useCase = new GetPeopleUseCase(repository)
  return useCase
}

export function makeGetPersonByIdUseCase() {
    const repository = new PersonRepository()
    const useCase = new GetPersonByIdUseCase(repository)
    return useCase
}

export function makeUpdatePersonUseCase() {
    const repository = new PersonRepository()
    const useCase = new UpdatePersonUseCase(repository)
    return useCase
}

export function makeDeletePersonUseCase() {
    const repository = new PersonRepository()
    return new DeletePersonUseCase(repository)
}