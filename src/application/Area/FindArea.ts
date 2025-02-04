import AreaController from "@db/AreaController";
import validateUuid from "@uuid/validateUuid";

export default class FindArea {
    constructor(private areaController: AreaController) { }
    async execute(id: string) {
        try {
            if (validateUuid(id))
                return await this.areaController.findAreaByElementID(id)
            // FIXME: CREATE VALIDATION ERROR
            // else throw new Error()
        } catch (error) {
            console.log(error);
            throw error
        }
    }
}