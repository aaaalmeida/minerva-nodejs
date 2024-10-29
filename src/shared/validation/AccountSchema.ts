import z from 'zod'
import { PersonFullNameRegex } from "@regex/PersonFullNameRegex"
import { EmailRegex } from '@regex/EmailRegex'
import { PasswordRegex } from '@regex/PasswordRegex'
import { IAccount } from '@domain/IAccount'

export const AccountSchema = z.object({
    fullname: z.string({ message: 'name' }).regex(PersonFullNameRegex, { message: 'regex name' }),
    email: z.string({ message: 'email' }).regex(EmailRegex, { message: 'regex email' }),
    password: z.string({ message: 'password' }).regex(PasswordRegex, { message: 'regex passwd' })
})

export const PartialAccountSchema = (data: Partial<IAccount>) => {
    const keys = Object.keys(data) as (keyof IAccount)[]

    const pickKeys = keys.reduce((acc, key) => {
        acc[key] = true;
        return acc;
    }, {} as Record<keyof IAccount, true>);

    return AccountSchema.pick(pickKeys).partial()
}