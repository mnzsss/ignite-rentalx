import { Request, Response } from 'express'

import { CreateCategoryUseCase } from './CreateCategoryUseCase'

class CreateCategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body

    await this.createCategoryUseCase.run({ name, description })

    return res
      .status(201)
      .json({ status: 'Sucesso', message: 'Categoria criada com sucesso.' })
  }
}

export { CreateCategoryController }
