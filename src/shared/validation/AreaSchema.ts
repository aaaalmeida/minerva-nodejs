import AreaRegex from "@regex/AreaRegex";
import { z } from "zod";

const AreaSchema = z.object({
    uuid: z.string({ message: "uuid" }).uuid(),
    name: z.string({ message: "name" }).regex(AreaRegex),
})

export default AreaSchema