import { AccountController } from "@db/AccountController"

export class ListAllAccount {
    constructor(private accountController: AccountController) { }

    async execute() {
        try {
            return await this.accountController.matchAllAccount()
        } catch (e) {
            throw e
        }
    }
}