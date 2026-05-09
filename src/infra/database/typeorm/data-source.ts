

import {env} from '@/shared/env'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({

    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: false,
    logging: true,
    entities: ['src/infra/database/typeorm/entities/*.ts'],
    migrations: ['src/infra/database/typeorm/migrations/*.ts']
})