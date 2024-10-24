import dotenv from 'dotenv'
dotenv.config()

import express from 'express'

const PORT = process.env.NODE_PORT || 3000
const app = express()

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => console.log('server on port 3000'))