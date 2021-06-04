import { ICreateSpecificationDTO } from '../dtos/ICreateSpecificationDTO'
import { Specification } from '../entities/Specification'

export interface ISpecificationsRepository {
  create(specification: ICreateSpecificationDTO): Promise<void>
  findByName(name: string): Promise<Specification | undefined>
  list(): Promise<Specification[]>
}
