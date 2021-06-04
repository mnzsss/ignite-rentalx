import { ICreateCategoryDTO } from '../dtos/ICreateCategoryDTO'
import { Category } from '../entities/Category'

export interface ICategoriesRepository {
  findByName(name: string): Promise<Category | undefined>
  list(): Promise<Category[]>
  create(category: ICreateCategoryDTO): Promise<void>
}
