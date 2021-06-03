import { Request, Response, Router } from 'express'

import { SpecificationsRepository } from '@modules/cars/repositories/SpecificationsRepository'
import { CreateSpecificationService } from '@modules/cars/services/CreateSpecificationService'

const specificationsRouter = Router()
const specificationsRepository = new SpecificationsRepository()

specificationsRouter.post('/create', async (req: Request, res: Response) => {
  const { name, description } = req.body

  const createSpecification = new CreateSpecificationService(
    specificationsRepository
  )

  await createSpecification.run({ name, description })

  return res
    .status(201)
    .json({ status: 'Sucesso', message: 'Especificação criada com sucesso.' })
})

specificationsRouter.get('/list', async (req: Request, res: Response) => {
  const specifications = await specificationsRepository.list()

  return res.status(201).json({ status: 'Sucesso', specifications })
})

export { specificationsRouter }
