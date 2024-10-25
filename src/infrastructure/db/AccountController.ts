import { getWriteSession, initDriver } from "@db/Neo4jConnection"
import { IAccount } from "@domain/IAccount"
import { Driver } from "neo4j-driver"

export class AccountController {
    driver: Driver | null = null

    async init() {
        this.driver = await initDriver()
    }

    insertAccount(account: IAccount) {
        return getWriteSession().run(
            "CREATE (n:Account $props) RETURN n",
            account
        )
    }
}