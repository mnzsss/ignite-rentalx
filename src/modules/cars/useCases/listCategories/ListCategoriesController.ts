import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ListCategoriesUseCase } from './ListCategoriesUseCase'

class ListCategoriesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listCategoriesUseCase = container.resolve(ListCategoriesUseCase)

    const categories = await listCategoriesUseCase.run()

    return res.json({ status: 'Sucesso', categories })
  }
}

export default new ListCategoriesController()
