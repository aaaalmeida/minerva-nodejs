import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import { accountRouter } from '@route/AccountRouter'

const PORT = process.env.NODE_PORT || 3000
const app = express()

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/account', accountRouter)

app.listen(PORT, () => console.log(`node server on port ${PORT} ${new Date().getHours()} ${new Date().getMinutes()}`))