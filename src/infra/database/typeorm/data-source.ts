import { env } from '@/shared/env'
import { DataSource } from 'typeorm'
import { PersonEntity } from './entities/person-entity' 

const isTestEnv = process.env.NODE_ENV === 'test'

export const AppDataSource = new DataSource({
    type: 'postgres',
    url: env.DATABASE_URL,
    synchronize: false,
    logging: true,
    ssl: {
        rejectUnauthorized: false 
    },
    // PASSE A CLASSE DIRETAMENTE AQUI:
    entities: [PersonEntity], 
    migrations: isTestEnv ? [] : ['src/infra/database/typeorm/migrations/*.ts']
})