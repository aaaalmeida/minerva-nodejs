import { Router, Request, Response } from "express"
import { AccountController } from "@db/AccountController"
import { CreateAccount } from "@usecase/CreateAccount"
import { ListAllAccount } from "@usecase/ListAllAccount"
import { IAccount } from "@domain/IAccount"
import { Neo4jConnection } from "@db/Neo4jConnection"

export const accountRouter = Router()

const accountController = new AccountController(new Neo4jConnection)

accountRouter.post("/", async (req: Request, res: Response) => {
    try {
        const data = req.body as IAccount
        const createAccountUseCase = new CreateAccount(accountController)
        res.status(201).send(await createAccountUseCase.execute(data))
    } catch (error) {
        res.status(500).send("Could not create account")
    }
})

accountRouter.get("/", async (req: Request, res: Response) => {
    try {
        const listAllAccountUseCase = new ListAllAccount(accountController)
        res.status(200).send(await listAllAccountUseCase.execute())
    } catch (error) {
        console.log(error)
        res.status(500).send("Could not found accounts")
    }
})