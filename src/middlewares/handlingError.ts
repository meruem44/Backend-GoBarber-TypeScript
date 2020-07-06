import { Response, Request, NextFunction } from 'express'

import AppError from '../errors/AppError'

interface ErrorHandling {
    err: Error;
    request: Request;
    response: Response;
    next: NextFunction
}

function handlingError ({ err, request, response, next }: ErrorHandling) {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message
    })
  }

  console.log(err)

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
}

export default handlingError
