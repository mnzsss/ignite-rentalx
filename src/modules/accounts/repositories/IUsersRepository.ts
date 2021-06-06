import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO'

import { User } from '../infra/typeorm/entities/User'

export interface IUsersRepository {
  create(user: ICreateUserDTO): Promise<void>
  findByEmail(email: string): Promise<User | undefined>
  findById(id: string): Promise<User | undefined>
  update(user: User): Promise<void>
}
