import { inject, injectable } from 'tsyringe'

import { Category } from '@modules/cars/entities/Category'

import { ICategoriesRepository } from '../../repositories/ICategoriesRepository'

@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  public async run(): Promise<Category[]> {
    return this.categoriesRepository.list()
  }
}

export { ListCategoriesUseCase }
