import z from 'zod'
import { PersonFullNameRegex } from "@regex/PersonFullNameRegex"
import { EmailRegex } from '@regex/EmailRegex'
import { PasswordRegex } from '@regex/PasswordRegex'

export const AccountSchema = z.object({
    fullname: z.string().trim().regex(PersonFullNameRegex),
    email: z.string().trim().email().regex(EmailRegex),
    password: z.string().trim().regex(PasswordRegex)
})