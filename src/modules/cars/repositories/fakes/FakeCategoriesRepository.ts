import { v4 } from 'uuid'

import { Category } from '@modules/cars/infra/typeorm/entities/Category'

import { ICreateCategoryDTO } from '../../dtos/ICreateCategoryDTO'
import { ICategoriesRepository } from '../ICategoriesRepository'

class FakeCategoriesRepository implements ICategoriesRepository {
  private categories: Category[] = []

  public async create({
    name,
    description
  }: ICreateCategoryDTO): Promise<void> {
    const category = new Category()

    Object.assign(category, {
      id: v4(),
      name,
      description,
      created_at: new Date(),
      updated_at: new Date()
    })

    this.categories.push(category)
  }

  public async list(): Promise<Category[]> {
    return this.categories
  }

  public async findByName(name: string): Promise<Category | undefined> {
    return this.categories.find(category => category.name === name)
  }
}

export { FakeCategoriesRepository }
