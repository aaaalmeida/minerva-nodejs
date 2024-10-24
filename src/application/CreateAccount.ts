import { AccountSchema } from "@validation/AccountSchema"

export class CreateAccount {
    execute(data: Object) {
        try {
            return AccountSchema.parse(data)
        } catch (error) {
            throw error
        }
    }
}