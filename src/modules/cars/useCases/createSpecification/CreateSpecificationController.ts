import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateSpecificationUseCase } from './CreateSpecificationUseCase'

class CreateSpecificationController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body

    const createSpecificationUseCase = container.resolve(
      CreateSpecificationUseCase
    )

    await createSpecificationUseCase.run({ name, description })

    return res
      .status(201)
      .json({ status: 'Sucesso', message: 'Especificação criada com sucesso.' })
  }
}

export default new CreateSpecificationController()
