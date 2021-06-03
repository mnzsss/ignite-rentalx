import { Specification } from '@modules/cars/models/Specification'
import { ISpecificationsRepository } from '@modules/cars/repositories/implementations/ISpecificationsRepository'

class ListSpecificationsUseCase {
  constructor(private specificationsRepository: ISpecificationsRepository) {}

  public async run(): Promise<Specification[]> {
    return this.specificationsRepository.list()
  }
}

export { ListSpecificationsUseCase }
