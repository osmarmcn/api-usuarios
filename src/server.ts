import "reflect-metadata";
import { app } from '@/app'

import { AppDataSource } from '@/infra/database/typeorm/data-source'

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected')

    app.listen(3333, () => {
      console.log('Server running on port 3333')
    })
  })
  .catch((error) => {
    console.error(error)
  })