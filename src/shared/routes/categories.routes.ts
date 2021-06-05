import { Router } from 'express'
import multer from 'multer'

import { uploadConfig } from '@config/upload'

import CreateCategoryController from '@modules/cars/useCases/createCategory/CreateCategoryController'
import ImportCategoryController from '@modules/cars/useCases/importCategory/ImportCategoryController'
import ListCategoriesController from '@modules/cars/useCases/listCategories/ListCategoriesController'

const uploadCategory = multer(uploadConfig.upload('./tmp'))

const categoriesRouter = Router()

categoriesRouter.post('/create', CreateCategoryController.handle)

categoriesRouter.get('/list', ListCategoriesController.handle)

categoriesRouter.post(
  '/import',
  uploadCategory.single('file'),
  ImportCategoryController.handle
)

export { categoriesRouter }
