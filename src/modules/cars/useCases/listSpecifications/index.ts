import { SpecificationsRepository } from '@modules/cars/repositories/SpecificationsRepository'

import { ListSpecificationsController } from './ListSpecificationsController'
import { ListSpecificationsUseCase } from './ListSpecificationsUseCase'

const specificationsRepository = SpecificationsRepository.getInstance()
const listSpecificationsUseCase = new ListSpecificationsUseCase(
  specificationsRepository
)
const listSpecificationsController = new ListSpecificationsController(
  listSpecificationsUseCase
)

export { listSpecificationsController }
