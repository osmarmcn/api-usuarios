

import { Person } from '@/domain/entities/person'

import { GetPeopleUseCase } from '@/domain/use-cases/getPeopleUseCase'
import { InMemoryPersonRepository } from '@/tests/repositories/in-memory-person-repository'



import {
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest'

let repository: InMemoryPersonRepository
let sut: GetPeopleUseCase

describe('Get People Use Case', () => {
  beforeEach(() => {
    repository = new InMemoryPersonRepository()

    sut = new GetPeopleUseCase(repository)
  })

  it('should be able list people', async () => {
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

    const people = await sut.execute()

    expect(people).toHaveLength(1)
  })
})