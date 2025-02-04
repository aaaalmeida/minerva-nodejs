import AreaController from "@db/AreaController";
import IArea from "@domain/IArea";
import validateUuid from "@uuid/validateUuid";

export default class UpdateArea {
    constructor(private areaController: AreaController) { }
    async execute(id: string, data: Partial<IArea>) {
        try {
            if(validateUuid(id))
                return await this.areaController.alterAreaProperties(data, id)
            // FIXME: AJUST LOGIC AND CREATE A SPECIFIC ERROR
            throw new Error()
        } catch (error) {
            console.log(error);
            throw error
        }
    }
}