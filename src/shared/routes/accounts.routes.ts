import { Router } from 'express'

import CreateUserController from '@modules/accounts/useCases/createUser/CreateUserController'

const usersRouter = Router()

usersRouter.post('/create', CreateUserController.handle)

export { usersRouter }
