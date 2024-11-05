import { AccountController } from "@db/AccountController"
import { PartialAccountSchema } from "@validation/AccountSchema"

export class UpdateAccountProperties {
    constructor(private accountController: AccountController) { }

    async execute(data: Object, id: string) {
        try {
            const partialAccount = PartialAccountSchema(data).parse(data)
            return await this.accountController.alterAccountProperties(partialAccount, id)
        } catch (error) {
            throw error
        }
    }
}