import dotenv from 'dotenv'
dotenv.config()

import express, { Express } from 'express'

import { accountRouter } from '@route/AccountRouter'
import { swaggerRouter } from '@route/SwaggerRouter'


import AreaController from '@db/AreaController'
import { Neo4jConnection } from '@db/Neo4jConnection'
import AreaRouter from '@route/AreaRouter'

const PORT = process.env.NODE_PORT || 3000
process.env.TZ = "America/Sao_Paulo"

const app: Express = express()

// MIDDLEWARE
app.use(express.json())

// ROUTES
// app.use('/account', accountRouter)
// app.use('/api-docs', swaggerRouter)
app.use('/area', AreaRouter)

app.listen(PORT, () => console.log(`node server on port ${PORT} ${new Date().toLocaleTimeString()}`))