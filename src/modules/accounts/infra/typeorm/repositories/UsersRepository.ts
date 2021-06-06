import { getRepository, Repository } from 'typeorm'

import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'

import { User } from '../entities/User'

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = getRepository(User)
  }
  public async update(user: User): Promise<void> {
    await this.ormRepository.save(user)
  }

  public async findById(id: string): Promise<User | undefined> {
    return this.ormRepository.findOne({ id })
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
