
import request from 'supertest'

import {beforeAll,describe,expect,it} from 'vitest'

import { app } from '@/app'

import { AppDataSource } from '@/infra/database/typeorm/data-source'

describe('Get People E2E', () => {
  beforeAll(async () => {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize()
    }
  })

  it('should list people', async () => {
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
      .get('/people')

    expect(response.statusCode).toEqual(200)

    expect(Array.isArray(response.body))
      .toBe(true)

    expect(response.body.length)
      .toBeGreaterThan(0)
  })
})