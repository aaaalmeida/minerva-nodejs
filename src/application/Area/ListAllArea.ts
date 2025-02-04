import AreaController from "@db/AreaController"
export default class ListAllArea {
    constructor(private areaController: AreaController) { }
    async execute() {
        try {
            return await this.areaController.matchAllArea()
        } catch (error) {
            throw error
        }
    }
}