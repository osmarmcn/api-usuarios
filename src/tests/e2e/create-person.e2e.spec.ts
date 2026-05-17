
import request from 'supertest'
// Adicionei beforeEach e afterAll nas importações
import { beforeAll, beforeEach, afterAll, describe, expect, it } from 'vitest' 
import { app } from '@/app'
import { AppDataSource } from '@/infra/database/typeorm/data-source'

describe('Create Person E2E', () => {
  beforeAll(async () => {
    await AppDataSource.initialize()
  })

  
  beforeEach(async () => {
    await AppDataSource.query('TRUNCATE TABLE people CASCADE;')
  })

  afterAll(async () => {
    if (AppDataSource.isInitialized) {
        await AppDataSource.destroy()
    }
    
  })

  it('should be able create a person', async () => {
    const response = await request(app)
      .post('/people')
      .send({
       
        name: 'João',
        email: 'joao@email.com',
        cpf: '12345678900',
        phone: '85999999999',
        address: 'Rua A',
        gender: 'male',
        profession: 'developer',
        education: 'college',
      })

    expect(response.statusCode).toEqual(201)

    expect(response.body).toEqual(
      expect.objectContaining({
        email: 'joao@email.com',
      }),
    )
  })
})