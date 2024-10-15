import dotenv from 'dotenv'
dotenv.config()

import neo4j, { Driver } from 'neo4j-driver'

const db_url = process.env.DB_URL || 'neo4j://localhost:7687'
const db_user = process.env.DB_USER || 'db_user'
const db_password = process.env.DB_PASSWRD || 'db_passwrd'

let driver: Driver

const initDriver = async () => {
    try {
        const driver = neo4j.driver(db_url, neo4j.auth.basic(db_user, db_password))
        await driver.getServerInfo()
        return driver
    } catch (e) { throw e }
}

const getDriver = () => {
    return driver
}

const closeDriver = async () => {
    if (driver) await driver.close()
}

module.exports = {
    initDriver,
    getDriver,
    closeDriver
}