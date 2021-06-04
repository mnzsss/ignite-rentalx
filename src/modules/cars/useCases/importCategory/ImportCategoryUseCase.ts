import csvParse from 'csv-parse'
import fs from 'fs'
import { inject, injectable } from 'tsyringe'

import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository'

type IImportCategory = {
  name: string
  description: string
}

@injectable()
class ImportCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  private async loadCategories(
    file: Express.Multer.File
  ): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path)
      const categories: IImportCategory[] = []

      const parseFile = csvParse()

      stream.pipe(parseFile)

      parseFile
        .on('data', async line => {
          const [name, description] = line

          categories.push({ name, description })
        })
        .on('end', () => {
          fs.promises.unlink(file.path)
          resolve(categories)
        })
        .on('error', err => reject(err))
    })
  }

  public async run(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file)

    for (const category of categories) {
      const { name, description } = category

      const categoryExists = await this.categoriesRepository.findByName(name)

      if (!categoryExists) {
        await this.categoriesRepository.create({
          name,
          description
        })
      }
    }
  }
}

export { ImportCategoryUseCase }
