import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateUserUseCase } from './CreateUserUseCase'

class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { driver_license, name, email, password } = req.body

    const createUserUseCase = container.resolve(CreateUserUseCase)

    await createUserUseCase.run({
      driver_license,
      name,
      email,
      password
    })

    return res
      .status(201)
      .json({ status: 'Sucesso', message: 'Usuário cadastrado com sucesso.' })
  }
}

export default new CreateUserController()
