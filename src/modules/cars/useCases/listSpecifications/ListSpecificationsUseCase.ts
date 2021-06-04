import { inject, injectable } from 'tsyringe'

import { Specification } from '@modules/cars/entities/Specification'
import { ISpecificationsRepository } from '@modules/cars/repositories/implementations/ISpecificationsRepository'

@injectable()
class ListSpecificationsUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository
  ) {}

  public async run(): Promise<Specification[]> {
    return this.specificationsRepository.list()
  }
}

export { ListSpecificationsUseCase }
