import { AccountController } from "@db/AccountController"
import { AccountSchema } from "@validation/AccountSchema"

export class CreateAccount {
    constructor(private accountController: AccountController) { }

    execute(data: Object) {
        try {
            const account = AccountSchema.parse(data)
            this.accountController.insertAccount(account)
        } catch (error) {
            throw error
        }
    }
}