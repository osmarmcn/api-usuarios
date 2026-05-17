import { Person } from '@/domain/entities/person'
import { GetPersonByIdUseCase } from '@/domain/use-cases/getPersonByIdUseCase'
import { InMemoryPersonRepository } from '@/tests/repositories/in-memory-person-repository'


import {
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest'

let repository: InMemoryPersonRepository
let sut: GetPersonByIdUseCase

describe('Get Person By Id Use Case', () => {
  beforeEach(() => {
    repository = new InMemoryPersonRepository()

    sut = new GetPersonByIdUseCase(repository)
  })

  it('should be able get person by id', async () => {
    const createdPerson =
      await repository.create(
        new Person(
          crypto.randomUUID(),
          'João',
          'joao@email.com',
          '12345678900',
          '85999999999',
          'Rua A',
          'male',
          'developer',
          'college',
        ),
      )

    const person = await sut.execute({
      id: createdPerson.id,
    })

    expect(person.id).toEqual(
      createdPerson.id,
    )
  })

  it('should not find nonexistent person', async () => {
    await expect(() =>
      sut.execute({
        id: 'nonexistent-id',
      }),
    ).rejects.toThrow('Person not found')
  })
})