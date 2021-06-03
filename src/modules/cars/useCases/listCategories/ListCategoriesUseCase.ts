import { Category } from '@modules/cars/models/Category'

import { ICategoriesRepository } from '../../repositories/implementations/ICategoriesRepository'

class ListCategoriesUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  public async run(): Promise<Category[]> {
    return this.categoriesRepository.list()
  }
}

export { ListCategoriesUseCase }
