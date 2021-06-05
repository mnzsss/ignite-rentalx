import { Router } from 'express'

import { isAuthenticated } from '@shared/middlewares/isAuthenticated'

import { usersRouter } from './accounts.routes'
import { categoriesRouter } from './categories.routes'
import { sessionsRouter } from './sessions.routes'
import { specificationsRouter } from './specifications.routes'

const router = Router()

router.use('/categories', isAuthenticated, categoriesRouter)
router.use('/specifications', specificationsRouter)
router.use('/accounts', usersRouter)
router.use(sessionsRouter)

export default router
