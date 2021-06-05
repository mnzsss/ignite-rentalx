import 'reflect-metadata'
import express, { Request, NextFunction, Response } from 'express'
import swaggerUi from 'swagger-ui-express'
import 'express-async-errors'

import AppError from './errors/AppError'
import swaggerFile from './swagger.json'
;(async function bootstrap() {
  console.info(new Date(), 'Starting to load routes')
  const appRoutes = (await import('./routes')).default
  console.info(new Date(), 'Routes loaded successfully')

  const app = express()
  app.set('port', process.env.PORT || 3333)
  app.use(express.json())

  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
  app.use('/api', appRoutes)

  console.info(new Date(), 'Connecting to database')
  await import('./database')
  console.info(new Date(), 'Connected to database')

  console.info(new Date(), 'Starting to load containers')
  await import('./container')
  console.info(new Date(), 'Containers loaded successfully')

  app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
    if (err instanceof AppError) {
      return res
        .status(err.statusCode)
        .json({ status: 'Erro', message: err.message })
    }

    console.error(err)

    return res
      .status(500)
      .json({ status: 'Erro', message: 'Erro interno do servidor.' })
  })

  app.listen(app.get('port'), () => {
    console.log(
      'Server is running at http://localhost:%d in %s mode',
      app.get('port'),
      app.get('env')
    )
    console.info(new Date(), 'Press CTRL-C to stop\n')
  })
})()
