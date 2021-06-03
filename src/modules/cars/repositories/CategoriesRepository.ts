import { ICreateCategoryDTO } from '../dtos/ICreateCategoryDTO'
import { Category } from '../models/Category'
import { ICategoriesRepository } from './implementations/ICategoriesRepository'

class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[]

  private static INSTACE: CategoriesRepository

  private constructor() {
    this.categories = []
  }

  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTACE) {
      CategoriesRepository.INSTACE = new CategoriesRepository()
    }

    return CategoriesRepository.INSTACE
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

  public async findByName(name: string): Promise<Category | undefined> {
    const category = this.categories.find(cat => cat.name === name)

    return category
  }
}

export { CategoriesRepository }
