import AppError from '@shared/errors/AppError'

import { FakeCategoriesRepository } from '@modules/cars/repositories/fakes/FakeCategoriesRepository'

import { CreateCategoryUseCase } from './CreateCategoryUseCase'

let fakeCategoriesRepository: FakeCategoriesRepository
let createCategory: CreateCategoryUseCase

describe('Criar Categoria', () => {
  const category = {
    name: 'SUV',
    description: 'Carro do modelo SUV'
  }

  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository()

    createCategory = new CreateCategoryUseCase(fakeCategoriesRepository)
  })

  it('Criar uma nova categoria.', async () => {
    await createCategory.run(category)

    const categoryCreated = await fakeCategoriesRepository.findByName(
      category.name
    )

    expect(categoryCreated).toHaveProperty('id')
  })

  it('Não é possível criar uma categoria com um nome que já existe', async () => {
    await createCategory.run(category)

    await expect(createCategory.run(category)).rejects.toBeInstanceOf(AppError)
  })
})
