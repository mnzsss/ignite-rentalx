import { Request, Response } from 'express'

import { ListCategoriesUseCase } from './ListCategoriesUseCase'

class ListCategoriesController {
  constructor(private listCategoriesUseCase: ListCategoriesUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const categories = await this.listCategoriesUseCase.run()

    return res.json({ status: 'Sucesso', categories })
  }
}

export { ListCategoriesController }
