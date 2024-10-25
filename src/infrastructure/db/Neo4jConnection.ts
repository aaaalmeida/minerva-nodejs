import dotenv from 'dotenv'
dotenv.config()

import neo4j, { Driver } from 'neo4j-driver'

const db_url = process.env.NEO4J_URL || 'neo4j://localhost:7687'
const db_user = process.env.NEO4J_USER || 'neo4j'
const db_password = process.env.NEO4J_PASSWRD || 'neo4j'
const db_name = process.env.NEO4J_NAME || 'neo4j'

let driver: Driver | null

export const initDriver = async () => {
    try {
        const driver = neo4j.driver(db_url, neo4j.auth.basic(db_user, db_password))
        await driver.getServerInfo()
        return driver
    } catch (e) { throw e }
}

export const getDriver = () => {
    return driver
}

export const closeDriver = async () => {
    if (driver) await driver.close()
}

export const getReadSession = () => {
    try {
        if (!driver) throw Error("Driver not initialized")

        return driver.session({
            defaultAccessMode: 'READ',
            database: db_name
        })
    } catch (e) { throw e }
}

export const getWriteSession = () => {
    try {
        if (!driver) throw Error("Driver not initialized")

        return driver.session({
            defaultAccessMode: 'WRITE',
            database: db_name
        })
    } catch (e) { throw e }
}