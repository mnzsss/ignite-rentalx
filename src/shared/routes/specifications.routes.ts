import { Request, Response, Router } from 'express'

import { createSpecificationController } from '@modules/cars/useCases/createSpecification'
import { listSpecificationsController } from '@modules/cars/useCases/listSpecifications'

const specificationsRouter = Router()

specificationsRouter.post('/create', async (req: Request, res: Response) =>
  createSpecificationController.handle(req, res)
)

specificationsRouter.get('/list', async (req: Request, res: Response) =>
  listSpecificationsController.handle(req, res)
)

export { specificationsRouter }
