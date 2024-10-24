import { PartialAccountSchema } from "@validation/AccountSchema"

export class UpdateAccount {
    execute(data: Object) {
        try {
            const partialAccount = PartialAccountSchema(data)
            
        } catch (error) {
            throw error
        }
    }
}