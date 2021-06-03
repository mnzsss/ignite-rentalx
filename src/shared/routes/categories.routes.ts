import { Request, Response, Router } from 'express'

import { createCategoryController } from '@modules/cars/useCases/createCategory'
import { listCategoriesController } from '@modules/cars/useCases/listCategories'

const categoriesRouter = Router()

categoriesRouter.post('/create', async (req: Request, res: Response) =>
  createCategoryController.handle(req, res)
)

categoriesRouter.get('/list', async (req: Request, res: Response) =>
  listCategoriesController.handle(req, res)
)

export { categoriesRouter }
