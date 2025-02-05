import AreaRegex from "@regex/AreaRegex"
import { z } from "zod"

const AreaSchema = z.object({
    uuid: z.string({ message: "uuid" }).uuid(),
    name: z.string({ message: "name" }).regex(AreaRegex),
})
const SafeParseAreaSchema = (data: Object) => AreaSchema.safeParse(data)

const PartialAreaSchema = AreaSchema.partial()
const SafeParsePartialAreaSchema = (data: Object) => PartialAreaSchema.safeParse(data)

export { AreaSchema, SafeParseAreaSchema, PartialAreaSchema, SafeParsePartialAreaSchema }