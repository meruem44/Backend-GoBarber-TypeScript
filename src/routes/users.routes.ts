import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '../config/upload'

import CreateUserService from '../services/CreateUserService'
import UdpateUserAvatarService from '../services/UdpatedUserAvatarService'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const usersRouter = Router()
const upload = multer(uploadConfig)

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body

    const createUser = new CreateUserService()

    const user = await createUser.execute({
      name,
      email,
      password
    })

    response.json(user)
  } catch (err) {
    response.status(400).json({ error: err.message })
  }
})

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {
  const udpatedUserAvatar = new UdpateUserAvatarService()

  const user = await udpatedUserAvatar.execute({
    user_id: request.user.id,
    avatarFilename: request.file.filename
  })

  response.json(user)
})

export default usersRouter
