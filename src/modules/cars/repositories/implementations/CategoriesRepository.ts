import { getRepository, Repository } from 'typeorm'

import { ICreateCategoryDTO } from '../../dtos/ICreateCategoryDTO'
import { Category } from '../../entities/Category'
import { ICategoriesRepository } from '../ICategoriesRepository'

class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>

  constructor() {
    this.ormRepository = getRepository(Category)
  }

  public async create({
    name,
    description
  }: ICreateCategoryDTO): Promise<void> {
    const category = this.ormRepository.create({ name, description })

    await this.ormRepository.save(category)
  }

  public async list(): Promise<Category[]> {
    return this.ormRepository.find()
  }

  public async findByName(name: string): Promise<Category | undefined> {
    return this.ormRepository.findOne({ name })
  }
}

export { CategoriesRepository }
