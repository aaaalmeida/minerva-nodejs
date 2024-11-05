import { AccountController } from "@db/AccountController"
import { AccountSchema } from "@validation/AccountSchema"

export class CreateAccount {
    constructor(private accountController: AccountController) { }

    async execute(data: Object) {
        try {
            const account = AccountSchema.parse(data)
            return await this.accountController.insertAccount(account)
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}