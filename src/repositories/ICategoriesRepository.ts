import { ICreateCategoryDTO } from '../dtos/ICreateCategoryDTO'
import { Category } from '../models/Category'

export interface ICategoriesRepository {
  findByName(name: string): Promise<Category>
  list(): Promise<Category[]>
  create(data: ICreateCategoryDTO): Promise<void>
}
