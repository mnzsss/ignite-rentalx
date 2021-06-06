import { Router } from 'express'

import CreateSpecificationController from '@modules/cars/useCases/createSpecification/CreateSpecificationController'
import ListSpecificationsController from '@modules/cars/useCases/listSpecifications/ListSpecificationsController'

const specificationsRouter = Router()

specificationsRouter.post('/create', CreateSpecificationController.handle)

specificationsRouter.get('/list', ListSpecificationsController.handle)

export { specificationsRouter }
