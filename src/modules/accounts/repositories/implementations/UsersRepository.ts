import { getRepository, Repository } from 'typeorm'

import { User } from '@modules/accounts/entities/User'

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { IUsersRepository } from '../IUsersRepository'

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = getRepository(User)
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.ormRepository.findOne({ email })
  }

  public async create({
    driver_license,
    name,
    email,
    password
  }: ICreateUserDTO): Promise<void> {
    const user = this.ormRepository.create({
      driver_license,
      name,
      email,
      password
    })

    await this.ormRepository.save(user)
  }
}

export { UsersRepository }
