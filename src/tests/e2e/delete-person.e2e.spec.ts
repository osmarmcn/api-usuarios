import request from 'supertest'
import { beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import { AppDataSource } from '@/infra/database/typeorm/data-source'
import { PersonEntity } from '@/infra/database/typeorm/entities/person-entity'

describe('Delete Person E2E', () => {
  beforeAll(async () => {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize()
    }
  })

  it('should delete person', async () => {
   
    await request(app)
      .post('/people')
      .send({
        name: 'João Delete',
        email: 'joao.delete@email.com',
        cpf: '12345678933',
        phone: '85999999933',
        address: 'Rua C',
        gender: 'male',
        profession: 'developer',
        education: 'college'
      })

   
    const personRepository = AppDataSource.getRepository(PersonEntity)
    const personInDb = await personRepository.findOneBy({ email: 'joao.delete@email.com' })
    
    expect(personInDb).toBeTruthy()
    const targetId = personInDb!.id

    
    const response = await request(app)
      .delete(`/people/${targetId}`)

    expect(response.statusCode).toEqual(204)

    
    const checkDeleted = await personRepository.findOneBy({ id: targetId })
    expect(checkDeleted).toBeNull()
  })
})