
import { beforeEach, describe, expect, it } from 'vitest'

import { Person } from '@/domain/entities/person'
import { DeletePersonUseCase } from '@/domain/use-cases/deletePersonUseCase'
import { InMemoryPersonRepository } from '@/tests/repositories/in-memory-person-repository'



let repository: InMemoryPersonRepository
let sut: DeletePersonUseCase

describe('Delete Person Use Case', () => {
  beforeEach(() => {
    repository = new InMemoryPersonRepository()

    sut = new DeletePersonUseCase(repository)
  })

  it('should be able delete a person', async () => {
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

    await sut.execute({
      id: createdPerson.id,
    })

    const people = await repository.findAll()

    expect(people).toHaveLength(0)
  })

  it('should not delete nonexistent person', async () => {
    await expect(() =>
      sut.execute({
        id: 'nonexistent-id',
      }),
    ).rejects.toThrow('Person not found')
  })
})