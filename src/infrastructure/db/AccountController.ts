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
            return records.at(0)?.get("newAccount")
        } catch (e) { throw e }
        // finally { if (this.session) this.dbConnection.closeSession(this.session) }
    }

    // FIXME:
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
            return records.map(r => r.get("account"))
        } catch (e) { throw e }
        // finally { if (this.session) this.dbConnection.closeSession(this.session) }
    }

    async findAccountByElementID(id: string) {
        try {
            if (!this.driver) await this.init()

            this.session = this.dbConnection.getReadSession()
            const { records } = await this.session.run(
                "MATCH (account:Account {uuid: $id}) RETURN account",
                { id: id }
            )
            return records.at(0)?.get("account")
        } catch (e) { throw e }
    }

    async followAccount(baseId: string, followedId: string) {
        try {
            if (!this.driver) await this.init()

            console.log(baseId);
            console.log(followedId);


            this.session = this.dbConnection.getWriteSession()
            const { records } = await this.session.run(
                `MATCH (baseAccount: Account {uuid: $baseId}),
                (followedAccount: Account {uuid: $followedId})
                CREATE (baseAccount)
                -[relation:FOLLOWING 
                    {
                        uuid: $followId,
                        followUpDate: $followUpDate,
                        followUpTime: $followUpTime
                    }
                ]-> (followedAccount)
                RETURN relation`,
                {
                    baseId: baseId,
                    followedId: followedId,
                    followId: uuidv4(),
                    followUpDate: new Date().toLocaleDateString(),
                    followUpTime: new Date().toLocaleTimeString(),
                }
            )

            return records.at(0)?.get("relation").get("properties")
        } catch (e) {
            console.log(e);

            throw e
        }
    }

    async unfollowAccount(baseId: string, unfollowedId: string) {
        try {
            if (!this.driver) await this.init()
                console.log("baseId", baseId);
                console.log("unfollowed", unfollowedId);

            this.session = this.dbConnection.getWriteSession()
            const { records } = await this.session.run(
                `MATCH (account:Account {uuid: $baseId})
                -[relation:FOLLOWING]->
                (unfollowedAccount:Account {uuid: $unfollowedId})
                RETURN relation`,
                {
                    baseId: baseId,
                    unfollowedId: unfollowedId
                })


            console.log(records);

        } catch (e) {
            throw e
        }
    }

    async deleteAccountWithoutRelations(id: string) {
        try {
            if (!this.driver) await this.init()

            this.session = this.dbConnection.getWriteSession()
            await this.session.run(
                'MATCH (account: Account {uuid: $id}) DELETE account',
                { id: id }
            )
        } catch (e) {
            throw e
        }
    }
}