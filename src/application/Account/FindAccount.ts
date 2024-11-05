import { AccountController } from "@db/AccountController";

export class FindAccount {
    constructor(private accountController: AccountController) { }

    async execute(id: string) {
        try {
            return await this.accountController.findAccountByElementID(id)
        } catch (e) {
            throw e
        }
    }
}