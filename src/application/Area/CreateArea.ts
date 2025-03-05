import AreaController from "@db/AreaController";
import IArea from "@domain/IArea";
import createUuid from "@uuid/createUuid";
import { SafeParseAreaSchema } from "@validation/AreaSchema";

export default class CreateArea {
    constructor(private areaController: AreaController) { }
    async execute(data: IArea) {
        try {
            data.uuid = createUuid()
            const result = SafeParseAreaSchema(data)
            if (result.success)
                return await this.areaController.insertArea(result.data)

            throw result.error
        } catch (e) {
            console.log(e)
            throw e
        }
    }
}