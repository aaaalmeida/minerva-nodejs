import AreaController from "@db/AreaController";
import validateUuid from "@uuid/validateUuid";

export default class DeleteArea {
    constructor(private areaController: AreaController) { }
    async execute(id: string) {
        try {
            if (validateUuid(id))
                await this.areaController.deleteArea(id)
        } catch (e) {
            console.log(e)
            throw e
        }
    }
}