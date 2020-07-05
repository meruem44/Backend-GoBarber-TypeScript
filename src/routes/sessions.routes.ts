import { Router } from 'express'

import AuthenticateUserService from '../services/AuthentocateUserService'

const sessionsRouter = Router()

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body

    const authenticateUser = new AuthenticateUserService()

    const { user } = await authenticateUser.execute({
      email,
      password
    })

    response.json(user)
  } catch (err) {
    response.status(400).json({ error: err.message })
  }
})

export default sessionsRouter
