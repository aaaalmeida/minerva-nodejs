import { AccountController } from "@db/AccountController"
import { Router, Request, Response } from "express"
import { CreateAccount } from "src/application/CreateAccount"

export const accountRouter = Router()

const accountController = new AccountController()
accountController.init()

accountRouter.post("/", (req: Request, res: Response,) => {
    try {
        const createAccountUseCase = new CreateAccount(accountController)
        res.status(201).send(createAccountUseCase.execute(req.body))
    } catch (error) {
        res.status(500).send()
    }
})