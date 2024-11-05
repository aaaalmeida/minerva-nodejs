import { Neo4jConnection } from "@db/Neo4jConnection"
import { IAccount } from "@domain/IAccount"
import { Driver, Session } from "neo4j-driver"
import { v4 as uuidv4 } from "uuid"

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

            account.uuid = uuidv4()

            this.session = this.dbConnection.getWriteSession()
            const { records } = await this.session.run(
                "CREATE (newAccount:Account $props) RETURN newAccount",
                { props: account }
            )
            return records.at(0)?.toObject().newAccount
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
            const { records } = await this.session.run(
                "MATCH (account:Account) RETURN account"
            )
            return records.map(r => r.toObject().account)
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