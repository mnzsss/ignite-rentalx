import { ICreateCategoryDTO } from '../dtos/ICreateCategoryDTO'
import { Category } from '../models/Category'

class CategoriesRepository {
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
}

export { CategoriesRepository }
