import { ICreateCategoryDTO } from '../dtos/ICreateCategoryDTO'
import { Category } from '../models/Category'
import { ICategoriesRepository } from './ICategoriesRepository'

class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[]

  constructor() {
    this.categories = []
  }

  public async create({
    name,
    description
  }: ICreateCategoryDTO): Promise<void> {
    const category = new Category()

    Object.assign(category, {
      name,
      description
    })

    this.categories.push(category)
  }

  public async list(): Promise<Category[]> {
    return this.categories
  }

  public async findByName(name: string): Promise<Category> {
    const category = this.categories.find(cat => cat.name === name)

    return category
  }
}

export { CategoriesRepository }
