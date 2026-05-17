
import { beforeEach, describe, expect, it } from 'vitest'

import { Person } from '@/domain/entities/person'
import { InMemoryPersonRepository } from '@/tests/repositories/in-memory-person-repository'
import { UpdatePersonUseCase } from '@/domain/use-cases/updatePersonUseCase'



let repository: InMemoryPersonRepository
let sut: UpdatePersonUseCase

describe('Update Person Use Case', () => {
  beforeEach(() => {
    repository = new InMemoryPersonRepository()

    sut = new UpdatePersonUseCase(repository)
  })

  it('should be able update a person', async () => {
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

    const updatedPerson =
      await sut.execute({
        id: createdPerson.id,

        name: 'João Atualizado',
      })

    expect(updatedPerson.name).toEqual(
      'João Atualizado',
    )
  })

  it('should not update nonexistent person', async () => {
    await expect(() =>
      sut.execute({
        id: 'nonexistent-id',

        name: 'Teste',
      }),
    ).rejects.toThrow('Person not found')
  })
})