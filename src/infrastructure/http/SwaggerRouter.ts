import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { Router } from 'express'

import { schemas } from '@swagger/shaggerSchema'
export const swaggerRouter = Router()

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Minerva',
            version: '1.0.0',
            description: 'Minerva API Documentation',
        },
        components: {
            schemas: schemas,
        },
    },
    apis: ['./src/infrastructure/http/*.ts'],
}

const swaggerDocs = swaggerJsdoc(swaggerOptions)
swaggerRouter.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs))