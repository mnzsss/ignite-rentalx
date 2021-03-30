import { ICategoriesRepository } from '../repositories/ICategoriesRepository'

interface IRequest {
  name: string
  description: string
}

class CreateCategoryService {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  public async run({ name, description }: IRequest): Promise<void> {
    const categoryExists = await this.categoriesRepository.findByName(name)

    if (categoryExists) {
      throw new Error('Category already exists.')
    }

    await this.categoriesRepository.create({ name, description })
  }
}

export { CreateCategoryService }
