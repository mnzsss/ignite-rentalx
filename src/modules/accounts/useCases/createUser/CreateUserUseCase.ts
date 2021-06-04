import { inject, injectable } from 'tsyringe'

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
    private usersRepository: IUsersRepository
  ) {}

  public async run({
    driver_license,
    name,
    email,
    password
  }: IRequest): Promise<void> {
    const userExists = await this.usersRepository.findByEmail(email)

    if (userExists) {
      throw new AppError('Esse e-mail já está sendo utilizado.')
    }

    await this.usersRepository.create({
      driver_license,
      name,
      email,
      password
    })
  }
}

export { CreateUserUseCase }
