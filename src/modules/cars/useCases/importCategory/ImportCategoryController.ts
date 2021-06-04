import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ImportCategoryUseCase } from './ImportCategoryUseCase'

class ImportCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { file } = req

    const importCategoryUseCase = container.resolve(ImportCategoryUseCase)

    await importCategoryUseCase.run(file)

    return res.status(204).send()
  }
}

export default new ImportCategoryController()
