import AreaController from "@db/AreaController";
import IArea from "@domain/IArea";
import validateUuid from "@uuid/validateUuid";
import { PartialAreaSchema, SafeParsePartialAreaSchema } from "@validation/AreaSchema";

export default class UpdateArea {
    constructor(private areaController: AreaController) { }
    async execute(id: string, data: Partial<IArea>) {
        try {
            if (!validateUuid(id))
                throw new InvalidUuidException(id)

            const result = SafeParsePartialAreaSchema(data)
            if (!result.success)
                throw result.error

            return await this.areaController.alterAreaProperties(result.data, id)
            // FIXME: AJUST LOGIC AND CREATE A SPECIFIC ERROR
        } catch (error) {
            console.log(error);
            throw error
        }
    }
}