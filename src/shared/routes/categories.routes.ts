import { Router } from 'express'
import multer from 'multer'
import path from 'path'

import CreateCategoryController from '@modules/cars/useCases/createCategory/CreateCategoryController'
import ImportCategoryController from '@modules/cars/useCases/importCategory/ImportCategoryController'
import ListCategoriesController from '@modules/cars/useCases/listCategories/ListCategoriesController'

const upload = multer({
  dest: path.resolve(__dirname, '..', '..', '..', 'tmp')
})

const categoriesRouter = Router()

categoriesRouter.post('/create', CreateCategoryController.handle)

categoriesRouter.get('/list', ListCategoriesController.handle)

categoriesRouter.post(
  '/import',
  upload.single('file'),
  ImportCategoryController.handle
)

export { categoriesRouter }
