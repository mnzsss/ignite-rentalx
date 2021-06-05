import { Router } from 'express'

import AuthenticateUserController from '@modules/accounts/useCases/authenticateUser/AuthenticateUserController'

const sessionsRouter = Router()

sessionsRouter.post('/login', AuthenticateUserController.handle)

export { sessionsRouter }
