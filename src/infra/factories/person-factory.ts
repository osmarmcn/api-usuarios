
import { PersonRepository } from '@/infra/database/repositories/person-repository'
import { CreatePersonUseCase } from '@/domain/use-cases/create-person-use-case'
import { GetPeopleUseCase } from '@/domain/use-cases/getPeopleUseCase'
import { GetPersonByIdUseCase } from '@/domain/use-cases/getPersonByIdUseCase'

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