import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateCategoryUseCase } from './CreateCategoryUseCase'

class CreateCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body

    const createCategoryUseCase = container.resolve(CreateCategoryUseCase)

    await createCategoryUseCase.run({ name, description })

    return res
      .status(201)
      .json({ status: 'Sucesso', message: 'Categoria criada com sucesso.' })
  }
}

export default new CreateCategoryController()
