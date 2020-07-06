import { Router } from 'express'

import AuthenticateUserService from '../services/AuthentocateUserService'

const sessionsRouter = Router()

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body

  const authenticateUser = new AuthenticateUserService()

  const { user } = await authenticateUser.execute({
    email,
    password
  })

  response.json(user)
})

export default sessionsRouter
