import { AccountController } from "@db/AccountController";

export class FollowOtherAccount {
    constructor(private accountController: AccountController) { }

    async execute(followerId: string, followedId: string) {
        try {
            return await this.accountController.followAccount(followerId, followedId)
        } catch (e) {
            throw e
        }
    }
}