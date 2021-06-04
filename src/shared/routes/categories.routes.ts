import { Request, Response, Router } from 'express'
import multer from 'multer'
import path from 'path'

import createCategoryController from '@modules/cars/useCases/createCategory'
import importCategoryController from '@modules/cars/useCases/importCategory'
import listCategoriesController from '@modules/cars/useCases/listCategories'

const upload = multer({
  dest: path.resolve(__dirname, '..', '..', '..', 'tmp')
})

const categoriesRouter = Router()

categoriesRouter.post('/create', async (req: Request, res: Response) =>
  createCategoryController().handle(req, res)
)

categoriesRouter.get('/list', async (req: Request, res: Response) =>
  listCategoriesController().handle(req, res)
)

categoriesRouter.post(
  '/import',
  upload.single('file'),
  async (req: Request, res: Response) =>
    importCategoryController().handle(req, res)
)

export { categoriesRouter }
