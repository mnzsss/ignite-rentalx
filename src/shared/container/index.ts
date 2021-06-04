import { container, delay } from 'tsyringe'

import { CategoriesRepository } from '@modules/cars/repositories/CategoriesRepository'
import { ICategoriesRepository } from '@modules/cars/repositories/implementations/ICategoriesRepository'
import { ISpecificationsRepository } from '@modules/cars/repositories/implementations/ISpecificationsRepository'
import { SpecificationsRepository } from '@modules/cars/repositories/SpecificationsRepository'

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  delay(() => CategoriesRepository)
)

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  delay(() => SpecificationsRepository)
)
