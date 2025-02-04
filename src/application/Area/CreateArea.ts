import AreaController from "@db/AreaController";
import IArea from "@domain/IArea";
import createUuid from "@uuid/createUuid";
import AreaSchema from "@validation/AreaSchema";

export default class CreateArea {
    constructor(private areaController: AreaController) { }
    async execute(data: IArea) {
        try {
            data.uuid = createUuid()
            const area = AreaSchema.parse(data)
            return await this.areaController.insertArea(area)
        } catch (e) {
            console.log(e)
            throw e
        }
    }
}