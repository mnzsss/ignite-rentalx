import { v4 } from 'uuid'

import { User } from '@modules/accounts/infra/typeorm/entities/User'

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { IUsersRepository } from '../IUsersRepository'

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = []

  public async update(user: User): Promise<void> {
    const updatedUser = this.users.map(usr => (usr.id === user.id ? user : usr))

    this.users = updatedUser
  }

  public async findById(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id)
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email)
  }

  public async create({
    driver_license,
    name,
    email,
    password
  }: ICreateUserDTO): Promise<void> {
    const user = new User()

    Object.assign(user, {
      id: v4(),
      driver_license,
      name,
      email,
      password,
      created_at: new Date(),
      updated_at: new Date()
    })

    this.users.push(user)
  }
}

export { FakeUsersRepository }
