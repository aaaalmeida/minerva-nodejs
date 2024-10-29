import { Neo4jConnection } from "@db/Neo4jConnection"
import { IAccount } from "@domain/IAccount"
import { Driver, Session } from "neo4j-driver"

export class AccountController {
    driver: Driver | null = null
    session: Session | null = null

    constructor(private dbConnection: Neo4jConnection) { }

    async init() {
        this.driver = await this.dbConnection.initDriver()
    }

    async insertAccount(account: IAccount) {
        try {
            if (!this.driver) await this.init()

            this.session = this.dbConnection.getWriteSession()
            return this.session.run(
                "CREATE (n:Account $props) RETURN n",
                { props: account }
            )
        } catch (e) { throw e }
        // finally { if (this.session) this.dbConnection.closeSession(this.session) }
    }

    async matchAllAccount() {
        try {
            if (!this.driver) await this.init()

            this.session = this.dbConnection.getReadSession()
            return this.session.run(
                "MATCH (n:Account) RETURN n"
            )
        } catch (e) { throw e }
        // finally { if (this.session) this.dbConnection.closeSession(this.session) }
    }
}