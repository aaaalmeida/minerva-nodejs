import { AccountController } from "@db/AccountController";

export class UnfollowAccount {
    constructor(private accountController: AccountController) { }

    async execute(baseId: string, unfollowId: string) {
        await this.accountController.unfollowAccount(baseId, unfollowId)
    }
}