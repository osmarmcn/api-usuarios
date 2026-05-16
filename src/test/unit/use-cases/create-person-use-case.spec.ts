
import { describe, expect, it, beforeEach } from 'vitest'

import { CreatePersonUseCase } from '@/domain/use-cases/create-person-use-case'
import { InMemoryPersonRepository } from '@/test/repositories/in-memory-person-repository'


let repository: InMemoryPersonRepository
let sut: CreatePersonUseCase

describe('Create Person Use Case', () => {
  beforeEach(() => {
    repository = new InMemoryPersonRepository()

    sut = new CreatePersonUseCase(repository)
  })

  it('should be able create a person', async () => {
    const person = await sut.execute({
      name: 'João',
      email: 'joao@email.com',
      cpf: '12345678900',
      phone: '85999999999',
      address: 'Rua A',
      gender: 'male',
      profession: 'developer',
      education: 'college',
    })

    expect(person.id).toEqual(expect.any(String))
  })
})