import { Request, Response, Router } from 'express'

import { CategoriesRepository } from '../repositories/CategoriesRepository'
import { CreateCategoryService } from '../services/CreateCategoryService'

const categoriesRouter = Router()
const categoriesRepository = new CategoriesRepository()

categoriesRouter.post('/', async (req: Request, res: Response) => {
  const { name, description } = req.body

  const createCategory = new CreateCategoryService(categoriesRepository)

  await createCategory.run({ name, description })

  return res.status(201).send()
})

categoriesRouter.get('/', async (req: Request, res: Response) => {
  const categories = await categoriesRepository.list()

  return res.status(201).json(categories)
})

export { categoriesRouter }
