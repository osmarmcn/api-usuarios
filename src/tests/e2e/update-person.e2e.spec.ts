
import request from 'supertest'

import {beforeAll,describe,expect,it} from 'vitest'

import { app } from '@/app'

import { AppDataSource } from '@/infra/database/typeorm/data-source'

describe('Update Person E2E', () => {
  beforeAll(async () => {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize()
    }
  })

  it('should update person', async () => {
    const createdPerson =
      await request(app)
        .post('/people')
        .send({
          name: 'João',
          email: 'joao@email.com',
          cpf: '12345678900',
          phone: '85999999999',
          address: 'Rua A',
        })

    const response =
      await request(app)
        .patch(`/people/${createdPerson.body.id}`)
        .send({name: 'João Atualizado'})
    expect(response.statusCode)
      .toEqual(200)

    expect(response.body.name)
      .toEqual('João Atualizado')
  })
})