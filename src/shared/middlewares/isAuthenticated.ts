import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

import auth from '@config/auth'

import AppError from '@shared/errors/AppError'

import { UsersRepository } from '@modules/accounts/repositories/implementations/UsersRepository'

interface ITokenPayload {
  sub: string
}

export async function isAuthenticated(
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new AppError('JWT Token is missing.', 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = verify(token, auth.secretKey)

    const { sub } = decoded as ITokenPayload

    const usersRepository = new UsersRepository()
    const userExists = await usersRepository.findById(sub)

    if (!userExists) {
      throw new AppError('Usuário não existe.', 401)
    }

    return next()
  } catch {
    throw new AppError('Invalid JWT token.', 401)
  }
}
