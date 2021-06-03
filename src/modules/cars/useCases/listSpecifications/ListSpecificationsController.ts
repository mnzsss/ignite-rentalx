import { Request, Response } from 'express'

import { ListSpecificationsUseCase } from './ListSpecificationsUseCase'

class ListSpecificationsController {
  constructor(private listSpecificationsUseCase: ListSpecificationsUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const specifications = await this.listSpecificationsUseCase.run()

    return res.json({ status: 'Sucesso', specifications })
  }
}

export { ListSpecificationsController }
