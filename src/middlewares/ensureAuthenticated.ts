import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

interface IPayload {
  sub: string
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization

  if (!authToken) {
    return response.status(401).end()
  }

  const [, token] = authToken.split(' ')

  try {
    const { sub } = verify(
      token,
      '8aba92c90156a5f72837859923009748'
    ) as IPayload

    request.user_id = sub
    return next()
  } catch (err) {
    return response.status(401).end()
  }
}
