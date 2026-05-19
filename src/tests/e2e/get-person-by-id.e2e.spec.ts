
import request from 'supertest'

import {beforeAll,describe,expect,it} from 'vitest'

import { app } from '@/app'

import { AppDataSource } from '@/infra/database/typeorm/data-source'

describe('Get Person By Id E2E', () => {
  beforeAll(async () => {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize()
    }
  })

  it('should get person by id', async () => {
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

    const response = await request(app)
      .get(`/people/${createdPerson.body.id}`)

    expect(response.statusCode)
      .toEqual(200)

    expect(response.body.id)
      .toEqual(createdPerson.body.id)
  })
})