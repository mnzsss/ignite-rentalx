import AppError from '@shared/errors/AppError'

import { ISpecificationsRepository } from '../repositories/implementations/ISpecificationsRepository'

interface IRequest {
  name: string
  description: string
}

class CreateSpecificationService {
  constructor(private specificationsRepository: ISpecificationsRepository) {}

  public async run({ name, description }: IRequest): Promise<void> {
    const specificationExists = await this.specificationsRepository.findByName(
      name
    )

    if (specificationExists) {
      throw new AppError('Essa especificação já existe.')
    }

    await this.specificationsRepository.create({ name, description })
  }
}

export { CreateSpecificationService }
