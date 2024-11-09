import dotenv from 'dotenv'
dotenv.config()

import express, { Express } from 'express'

import { accountRouter } from '@route/AccountRouter'
import { swaggerRouter } from '@route/SwaggerRouter'

const PORT = process.env.NODE_PORT || 3000
process.env.TZ = "America/Sao_Paulo"

const app: Express = express()


app.use(express.json())
app.use('/account', accountRouter)
app.use('/api-docs', swaggerRouter)

app.get('/', (req, res) => { res.send('Hello World!') })

app.listen(PORT, () => console.log(`node server on port ${PORT} ${new Date().toLocaleTimeString()}`))