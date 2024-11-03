import { Neo4jConnection } from "@db/Neo4jConnection"
import { IAccount } from "@domain/IAccount"
import { Driver, Session } from "neo4j-driver"

// TODO: add error treatment
// TODO: find a way to close session after use
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
            return await this.session.run(
                "CREATE (n:Account $props) RETURN n",
                { props: account }
            )
        } catch (e) { throw e }
        // finally { if (this.session) this.dbConnection.closeSession(this.session) }
    }

    async alterAccountProperties(accountPartial: Partial<IAccount>, elementID: string) {
        try {
            if (!this.driver) await this.init()

            this.session = this.dbConnection.getWriteSession()

            const updateStatements = Object.keys(accountPartial)
                .map(k => `n.${k} = $${k}`)
                .join(', ')
            return await this.session.run(
                "MATCH (n: Account {elementId: $elementID}) SET ${updateStatements} RETURN n",
                { elementID, ...accountPartial }
            )
        } catch (e) { throw e }
    }

    async matchAllAccount() {
        try {
            if (!this.driver) await this.init()

            this.session = this.dbConnection.getReadSession()
            return await this.session.run(
                "MATCH (n:Account) RETURN n"
            )
        } catch (e) { throw e }
        // finally { if (this.session) this.dbConnection.closeSession(this.session) }
    }

    async findAccountByElementID(id: string) {
        try {
            if (!this.driver) await this.init()
            console.log('ID', id);

            this.session = this.dbConnection.getReadSession()
            return await this.session.run(
                "MATCH (n:Account {elementId: $id}) RETURN n",
                { id: id }
            )
        } catch (e) { throw e }
    }
}