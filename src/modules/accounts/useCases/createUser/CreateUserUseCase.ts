import { inject, injectable } from 'tsyringe'

import IHashProvider from '@providers/HashProvider/models/IHashProvider'
import AppError from '@shared/errors/AppError'

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'

interface IRequest {
  name: string
  password: string
  email: string
  driver_license: string
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async run({
    driver_license,
    name,
    email,
    password
  }: IRequest): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new AppError('Esse e-mail já está sendo utilizado.')
    }

    const passwordHashed = await this.hashProvider.generateHash(password)

    await this.usersRepository.create({
      driver_license,
      name,
      email,
      password: passwordHashed
    })
  }
}

export { CreateUserUseCase }
