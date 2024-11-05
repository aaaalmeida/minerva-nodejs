import { Router, Request, Response } from "express"
import { AccountController } from "@db/AccountController"
import { CreateAccount } from "@usecase/Account/CreateAccount"
import { ListAllAccount } from "@usecase/Account/ListAllAccount"
import { IAccount } from "@domain/IAccount"
import { Neo4jConnection } from "@db/Neo4jConnection"
import { UpdateAccountProperties } from "@usecase/Account/UpdateAccountProperties"
import { FindAccount } from "@usecase/Account/FindAccount"

// TODO: fix status code
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
        res.status(500).send("Could not found accounts")
    }
})

accountRouter.get("/:id", async (req: Request, res: Response) => {
    try {
        const elementID = req.params.id
        const findAccountByElementID = new FindAccount(accountController)
        res.status(200).send(await findAccountByElementID.execute(elementID))
    } catch (e) {
        res.status(500).send("Could not found account with this ID")
    }
})

accountRouter.patch("/", async (req: Request, res: Response) => {
    try {
        const { elementID, accountProperties } = req.body
        const updateAccountUseCase = new UpdateAccountProperties(accountController)
        res.status(200).send(updateAccountUseCase.execute(accountProperties, elementID))
    } catch (error) {
        res.status(500).send("Could not update account")
    }
})