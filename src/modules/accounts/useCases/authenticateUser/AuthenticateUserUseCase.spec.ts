import FakeHashProvider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider'
import AppError from '@shared/errors/AppError'

import { FakeUsersRepository } from '@modules/accounts/repositories/fakes/FakeUsersRepository'

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let authenticateUser: AuthenticateUserUseCase

describe('Autenticação', () => {
  const user = {
    driver_license: '232321313',
    name: 'Gabriel',
    email: 'gabriel@teste.com',
    password: '123123'
  }

  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()

    authenticateUser = new AuthenticateUserUseCase(
      fakeUsersRepository,
      fakeHashProvider
    )

    await fakeUsersRepository.create(user)
  })

  it('Gerar a autenticação do usuário.', async () => {
    const userLogged = await authenticateUser.run({
      email: user.email,
      password: user.password
    })

    expect(userLogged).toHaveProperty('token')
  })

  it('Não é possível fazer login com o e-mail errado.', async () => {
    await expect(
      authenticateUser.run({
        email: 'email-errado',
        password: user.password
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('Não é possível fazer login com a senha errada.', async () => {
    await expect(
      authenticateUser.run({
        email: user.email,
        password: 'senha-errada'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
