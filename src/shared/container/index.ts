import { container, delay } from 'tsyringe'

import './providers'

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository'
import { SpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository'
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository'
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository'

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  delay(() => CategoriesRepository)
)

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  delay(() => SpecificationsRepository)
)

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  delay(() => UsersRepository)
)
