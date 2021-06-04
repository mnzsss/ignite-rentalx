import express, { Request, NextFunction, Response } from 'express'
import swaggerUi from 'swagger-ui-express'
import 'express-async-errors'

import AppError from './errors/AppError'
import router from './routes'
import swaggerFile from './swagger.json'

const app = express()

app.use(express.json())

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use('/api', router)

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ status: 'Erro', message: err.message })
  }

  console.log(err)

  return res
    .status(500)
    .json({ status: 'Erro', message: 'Erro interno do servidor.' })
})

app.listen(3333, () => console.log('Server is running!'))
