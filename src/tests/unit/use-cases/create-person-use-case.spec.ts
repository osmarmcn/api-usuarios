
import { describe, expect, it, beforeEach } from 'vitest'

import { CreatePersonUseCase } from '@/domain/use-cases/create-person-use-case'
import { InMemoryPersonRepository } from '@/tests/repositories/in-memory-person-repository'


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

  it('should not allow duplicated email', async () => {
    await sut.execute({
      name: 'João',
      email: 'joao@email.com',
      cpf: '12345678900',
      phone: '85999999999',
      address: 'Rua A',
      gender: 'male',
      profession: 'developer',
      education: 'college',
    })

    await expect(() =>
      sut.execute({
        name: 'Maria',
        email: 'joao@email.com',
        cpf: '99999999999',
        phone: '85888888888',
        address: 'Rua B',
        gender: 'female',
        profession: 'designer',
        education: 'college',
      }),
    ).rejects.toThrow('Email already exists')
  })

  it('should not allow duplicated cpf', async () => {
    await sut.execute({
      name: 'João',
      email: 'joao@email.com',
      cpf: '12345678900',
      phone: '85999999999',
      address: 'Rua A',
      gender: 'male',
      profession: 'developer',
      education: 'college',
    })

    await expect(() =>
      sut.execute({
        name: 'Maria',
        email: 'maria@email.com',
        cpf: '12345678900',
        phone: '85888888888',
        address: 'Rua B',
        gender: 'female',
        profession: 'designer',
        education: 'college',
      }),
    ).rejects.toThrow('CPF already exists')
  })

  it('should not allow duplicated phone', async () => {
    await sut.execute({
      name: 'João',
      email: 'joao@email.com',
      cpf: '12345678900',
      phone: '85999999999',
      address: 'Rua A',
      gender: 'male',
      profession: 'developer',
      education: 'college',
    })

    await expect(() =>
      sut.execute({
        name: 'Maria',
        email: 'maria@email.com',
        cpf: '99999999999',
        phone: '85999999999',
        address: 'Rua B',
        gender: 'female',
        profession: 'designer',
        education: 'college',
      }),
    ).rejects.toThrow('Phone already exists')
  })
})