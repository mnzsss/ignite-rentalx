import { ICreateSpecificationDTO } from '../dtos/ICreateSpecificationDTO'
import { Specification } from '../entities/Specification'
import { ISpecificationsRepository } from './implementations/ISpecificationsRepository'

class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[]

  private static INSTACE: SpecificationsRepository

  private constructor() {
    this.specifications = []
  }

  public static getInstance(): SpecificationsRepository {
    if (!SpecificationsRepository.INSTACE) {
      SpecificationsRepository.INSTACE = new SpecificationsRepository()
    }

    return SpecificationsRepository.INSTACE
  }

  public async create({
    name,
    description
  }: ICreateSpecificationDTO): Promise<void> {
    const specification = new Specification()

    Object.assign(specification, {
      name,
      description
    })

    this.specifications.push(specification)
  }

  public async list(): Promise<Specification[]> {
    return this.specifications
  }

  public async findByName(name: string): Promise<Specification | undefined> {
    const specification = this.specifications.find(
      specify => specify.name === name
    )

    return specification
  }
}

export { SpecificationsRepository }
