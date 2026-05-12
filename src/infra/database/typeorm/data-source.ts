


import { env } from '@/shared/env'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({

    type: 'postgres',
    url: env.DATABASE_URL,
    synchronize: true,
    logging: true,
    ssl: {
        rejectUnauthorized: false 
    },
    entities: ['src/infra/database/typeorm/entities/*.ts'],
    migrations: ['src/infra/database/typeorm/migrations/*.ts']
})