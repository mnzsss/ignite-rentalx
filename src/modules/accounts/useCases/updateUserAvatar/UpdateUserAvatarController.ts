import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase'

class UpdateUserAvatarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { userId, file } = req
    const avatarFile = file.filename

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase)

    await updateUserAvatarUseCase.run({ userId, avatarFile })

    return res.status(204).json({
      status: 'Sucesso',
      message: 'Sua foto de perfil foi atualizada.'
    })
  }
}

export default new UpdateUserAvatarController()
