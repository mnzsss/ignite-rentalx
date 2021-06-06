import { Router } from 'express'
import multer from 'multer'

import { uploadConfig } from '@config/upload'

import CreateUserController from '@modules/accounts/useCases/createUser/CreateUserController'
import UpdateUserAvatarController from '@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController'

import { isAuthenticated } from '../middlewares/isAuthenticated'

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'))

const usersRouter = Router()

usersRouter.post('/create', CreateUserController.handle)
usersRouter.patch(
  '/avatar',
  uploadAvatar.single('avatar'),
  isAuthenticated,
  UpdateUserAvatarController.handle
)

export { usersRouter }
