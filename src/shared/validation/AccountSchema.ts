import z from 'zod'
import { PersonFullNameRegex } from "@regex/PersonFullNameRegex"
import { EmailRegex } from '@regex/EmailRegex'
import { PasswordRegex } from '@regex/PasswordRegex'
import { IAccount } from '@domain/IAccount'

export const AccountSchema = z.object({
    fullname: z.string().trim().regex(PersonFullNameRegex),
    email: z.string().trim().email().regex(EmailRegex),
    password: z.string().trim().regex(PasswordRegex)
})

export const PartialAccountSchema = (data: Partial<IAccount>) => {
    const keys = Object.keys(data) as (keyof IAccount)[]

    const pickKeys = keys.reduce((acc, key) => {
        acc[key] = true;
        return acc;
    }, {} as Record<keyof IAccount, true>);

    return AccountSchema.pick(pickKeys).partial()
}