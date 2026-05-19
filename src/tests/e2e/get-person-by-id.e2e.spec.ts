import request from 'supertest'
import { beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import { AppDataSource } from '@/infra/database/typeorm/data-source'
import { PersonEntity } from '@/infra/database/typeorm/entities/person-entity' // Importe a entidade

describe('Get Person By Id E2E', () => {
  beforeAll(async () => {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize()
    }
  })

  it('should get person by id', async () => {
    // 1. Criamos a pessoa batendo na rota de POST
    await request(app)
      .post('/people')
      .send({
        name: 'João Get ID',
        email: 'joao.getid@email.com', // Massa de dados única para evitar qualquer conflito
        cpf: '12345678911',
        phone: '85999999911',
        address: 'Rua A',
        gender: 'male',
        profession: 'developer',
        education: 'college'
      })

    // 2. CORREÇÃO: Buscamos diretamente no repositório do banco o ID correto que acabou de ser gerado pelo banco
    const personRepository = AppDataSource.getRepository(PersonEntity)
    const personInDb = await personRepository.findOneBy({ email: 'joao.getid@email.com' })

    // Garantimos que a pessoa existe no banco antes de prosseguir
    expect(personInDb).toBeTruthy()
    const targetId = personInDb!.id

    // 3. Agora chamamos a rota GET passando um UUID válido e garantido
    const response = await request(app)
      .get(`/people/${targetId}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.id).toEqual(targetId)
  })
})