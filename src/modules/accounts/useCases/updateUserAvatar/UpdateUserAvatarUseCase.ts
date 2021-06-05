import { inject, injectable } from 'tsyringe'

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider'
import AppError from '@shared/errors/AppError'

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'

interface IRequest {
  avatarFile: string
  userId: string
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  public async run({ avatarFile, userId }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new AppError('Usuário não existe')
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile('avatar', user.avatar)
    }

    user.avatar = avatarFile

    await this.usersRepository.update(user)
  }
}

export { UpdateUserAvatarUseCase }
