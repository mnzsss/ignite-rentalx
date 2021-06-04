import { Router } from 'express'

import { usersRouter } from './accounts.routes'
import { categoriesRouter } from './categories.routes'
import { specificationsRouter } from './specifications.routes'

const router = Router()

router.use('/categories', categoriesRouter)
router.use('/specifications', specificationsRouter)
router.use('/accounts', usersRouter)

export default router
