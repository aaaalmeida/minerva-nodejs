import AreaController from "@db/AreaController";
import { Neo4jConnection } from "@db/Neo4jConnection";
import CreateArea from "@usecase/Area/CreateArea";
import DeleteArea from "@usecase/Area/DeleteArea";
import FindArea from "@usecase/Area/FindArea";
import ListAllArea from "@usecase/Area/ListAllArea";
import UpdateArea from "@usecase/Area/UpdateArea";
import { Router, Request, Response } from "express";

const AreaRouter = Router()
export default AreaRouter

const areaController: AreaController = new AreaController(new Neo4jConnection())

AreaRouter.get("/", async (req: Request, res: Response) => {
    try {
        const listAllAccountUseCase = new ListAllArea(areaController)
        res.status(200).send(await listAllAccountUseCase.execute())
    } catch (error) {
        res.status(500).send("Could not found areas")
    }
})

AreaRouter.get("/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const findArea = new FindArea(areaController)
        res.status(200).send(await findArea.execute(id))
    } catch (error) {
        res.status(500).send("Could not found areas")
    }
})

AreaRouter.post("/", async (req: Request, res: Response) => {
    try {
        const createArea = new CreateArea(areaController)
        res.status(201).send(await createArea.execute(req.body))
    } catch (error) { res.status(500).send("Could not create area") }
})

AreaRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const deleteArea = new DeleteArea(areaController)
        res.status(204).send(await deleteArea.execute(id))
    } catch (e) {
        res.status(500).send("Could not delete area")
    }
})

AreaRouter.patch("/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const data = req.body

        const updateArea = new UpdateArea(areaController)
        res.status(200).send(await updateArea.execute(id, data))
    } catch (error) {

    }
})