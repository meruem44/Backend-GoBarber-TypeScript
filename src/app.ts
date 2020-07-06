import express, { json } from 'express'
import 'express-async-errors'
import cors from 'cors'

import uploadConfig from './config/upload'
import routes from './routes'

import handlingError from './middlewares/handlingError'

import './database'

class App {
    server: express.Application

    constructor () {
      this.server = express()

      this.middlewares()
      this.routes()

      this.server.use(handlingError)
    }

    middlewares () {
      this.server.use(json())
      this.server.use(cors())

      this.server.use('/files', express.static(uploadConfig.directory))
    }

    routes () {
      this.server.use(routes)
    }
}

export default new App().server
