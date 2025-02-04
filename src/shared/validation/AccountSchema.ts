import z from 'zod'
import { EmailRegex } from '@regex/EmailRegex'
import { PasswordRegex } from '@regex/PasswordRegex'
import PersonNameRegex from '@regex/PersonNameRegex'
import IAccount from '@domain/IAccount'
import UrlRegex from '@regex/UrlRegex'
import PhoneRegex from '@regex/PhoneRegex'

export const AccountSchema = z.object({
    uuid: z.string({ message: "uuid" }).uuid(),
    email: z.string({ message: 'email' }).regex(EmailRegex, { message: 'regex email' }),
    password: z.string({ message: 'password' }).regex(PasswordRegex, { message: 'regex passwd' }),
    name: z.string({ message: "name" }).regex(PersonNameRegex),
    middleName: z.optional(z.string({ message: 'middleName' }).regex(PersonNameRegex)),
    lastName: z.string({ message: "lastName" }).regex(PersonNameRegex),
    url: z.optional(z.string({ message: 'url' }).regex(UrlRegex)),
    phone: z.optional(z.string({ message: 'phone' }).regex(PhoneRegex))
})

// export const PartialAccountSchema = (data: Partial<IAccount>) => {
//     const keys = Object.keys(data) as (keyof IAccount)[]

//     const pickKeys = keys.reduce((acc, key) => {
//         acc[key] = true;
//         return acc;
//     }, {} as Record<keyof IAccount, true>);

//     return AccountSchema.pick(pickKeys).partial()
// }