import { AccountController } from "@db/AccountController";

export class DeleteAccount {
    constructor(private accountController: AccountController) { }
    async execute(id: string) {
        await this.accountController.deleteAccountWithoutRelations(id)
    }
}