import request from 'supertest'
import { beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import { AppDataSource } from '@/infra/database/typeorm/data-source'
import { PersonEntity } from '@/infra/database/typeorm/entities/person-entity'

describe('Update Person E2E', () => {
  beforeAll(async () => {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize()
    }
  })

  it('should update person', async () => {
    
    await request(app)
      .post('/people')
      .send({
        name: 'João Original',
        email: 'joao.update@email.com',
        cpf: '12345678922',
        phone: '85999999922',
        address: 'Rua B',
        gender: 'male',
        profession: 'developer',
        education: 'college'
      })

   
    const personRepository = AppDataSource.getRepository(PersonEntity)
    const personInDb = await personRepository.findOneBy({ email: 'joao.update@email.com' })
    
    expect(personInDb).toBeTruthy()
    const targetId = personInDb!.id

    
    const response = await request(app)
      .patch(`/people/${targetId}`) 
      .send({ name: 'João Atualizado' }) 

    
    expect([200, 204]).toContain(response.statusCode)

    
    if (response.statusCode === 200) {
      expect(response.body.name).toEqual('João Atualizado')
    }
  })
})