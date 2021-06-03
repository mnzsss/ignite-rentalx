import { SpecificationsRepository } from '@modules/cars/repositories/SpecificationsRepository'

import { CreateSpecificationController } from './CreateSpecificationController'
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase'

const specificationsRepository = SpecificationsRepository.getInstance()
const createSpecificationUseCase = new CreateSpecificationUseCase(
  specificationsRepository
)
const createSpecificationController = new CreateSpecificationController(
  createSpecificationUseCase
)

export { createSpecificationController }
