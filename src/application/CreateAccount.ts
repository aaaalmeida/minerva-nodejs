import { AccountSchema } from "@validation/AccountSchema"

export class CreateAccount {
    execute(data: Object) {
        return AccountSchema.parse(data)
    }
}