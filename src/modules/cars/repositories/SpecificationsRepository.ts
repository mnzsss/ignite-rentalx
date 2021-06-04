import { getRepository, Repository } from 'typeorm'

import { ICreateSpecificationDTO } from '../dtos/ICreateSpecificationDTO'
import { Specification } from '../entities/Specification'
import { ISpecificationsRepository } from './implementations/ISpecificationsRepository'

class SpecificationsRepository implements ISpecificationsRepository {
  private ormRepository: Repository<Specification>

  constructor() {
    this.ormRepository = getRepository(Specification)
  }

  public async create({
    name,
    description
  }: ICreateSpecificationDTO): Promise<void> {
    const category = this.ormRepository.create({ name, description })

    await this.ormRepository.save(category)
  }

  public async list(): Promise<Specification[]> {
    return this.ormRepository.find()
  }

  public async findByName(name: string): Promise<Specification | undefined> {
    return this.ormRepository.findOne({ where: { name } })
  }
}

export { SpecificationsRepository }
