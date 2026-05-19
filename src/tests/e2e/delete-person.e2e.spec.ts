
import request from 'supertest'

import {beforeAll,describe,expect,it} from 'vitest'

import { app } from '@/app'

import { AppDataSource } from '@/infra/database/typeorm/data-source'

describe('Delete Person E2E', () => {
  beforeAll(async () => {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize()
    }
  })

  it('should delete person', async () => {
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
        .delete(`/people/${createdPerson.body.id}`)

    expect(response.statusCode)
      .toEqual(204)
  })
})