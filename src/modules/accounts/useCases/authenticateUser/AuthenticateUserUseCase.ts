import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import auth from '@config/auth'

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider'
import AppError from '@shared/errors/AppError'

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'

type IRequest = {
  email: string
  password: string
}

type IResponse = {
  token: string
  user: {
    name: string
    email: string
  }
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async run({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('E-mail ou senha inválida.')
    }

    const passwordMatch = await this.hashProvider.compareHash(
      password,
      user.password
    )

    if (!passwordMatch) {
      throw new AppError('E-mail ou senha inválida.')
    }

    const { expiresIn, secretKey } = auth

    const token = sign({}, secretKey, {
      expiresIn,
      subject: user.id
    })

    return {
      user: {
        name: user.name,
        email
      },
      token
    }
  }
}

export { AuthenticateUserUseCase }
