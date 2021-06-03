import AppError from '@shared/errors/AppError'

import { ICategoriesRepository } from '../../repositories/implementations/ICategoriesRepository'

interface IRequest {
  name: string
  description: string
}

class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  public async run({ name, description }: IRequest): Promise<void> {
    const categoryExists = await this.categoriesRepository.findByName(name)

    if (categoryExists) {
      throw new AppError('Essa categoria já existe.')
    }

    await this.categoriesRepository.create({ name, description })
  }
}

export { CreateCategoryUseCase }
