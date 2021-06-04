import csvParse from 'csv-parse'
import fs from 'fs'

import { CategoriesRepository } from '@modules/cars/repositories/CategoriesRepository'

type IImportCategory = {
  name: string
  description: string
}

class ImportCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

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
