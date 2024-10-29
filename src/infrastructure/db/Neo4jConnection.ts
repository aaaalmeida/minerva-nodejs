import dotenv from 'dotenv'
dotenv.config()

import neo4j, { Driver, Session } from 'neo4j-driver'

const db_url = process.env.NEO4J_URL || 'bolt://localhost:7687'
const db_user = process.env.NEO4J_USER || 'neo4j'
const db_password = process.env.NEO4J_PASSWRD || 'neo4j'
const db_name = process.env.NEO4J_NAME || 'neo4j'

export class Neo4jConnection {
    private driver: Driver | null = null

    async initDriver() {
        try {
            this.driver = neo4j.driver(db_url, neo4j.auth.basic(db_user, db_password))
            await this.driver.getServerInfo()
            return this.driver
        } catch (e) { throw e }
    }

    getDriver() {
        return this.driver
    }

    async closeSession(session: Session) {
        if (session) await session.close()
    }

    getReadSession() {
        try {
            if (!this.driver) throw Error("Driver not initialized")

            const session = this.driver.session({
                defaultAccessMode: 'READ',
                database: db_name
            })
            return session
        } catch (e) { throw e }
    }

    getWriteSession() {
        try {
            if (!this.driver) throw Error("Driver not initialized")

            const session = this.driver.session({
                defaultAccessMode: 'WRITE',
                database: db_name
            })
            return session
        } catch (e) { throw e }
    }
}