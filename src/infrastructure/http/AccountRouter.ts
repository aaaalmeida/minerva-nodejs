import { Router, Request, Response } from "express"
import { AccountController } from "@db/AccountController"
import { CreateAccount } from "@usecase/Account/CreateAccount"
import { ListAllAccount } from "@usecase/Account/ListAllAccount"
import { IAccount } from "@domain/IAccount"
import { Neo4jConnection } from "@db/Neo4jConnection"
import { UpdateAccountProperties } from "@usecase/Account/UpdateAccountProperties"
import { FindAccount } from "@usecase/Account/FindAccount"
import { FollowOtherAccount } from "@usecase/Account/FollowOtherAccount"
import { DeleteAccount } from "@usecase/Account/DeleteAccount"
import { UnfollowAccount } from "@usecase/Account/UnfollowAccount"

// TODO: fix status code
// TODO: add error handling
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

accountRouter.post("/follow", async (req: Request, res: Response) => {
    try {
        const { followerId, followedId } = req.body
        const followAccountUseCase = new FollowOtherAccount(accountController)
        res.status(201).send(await followAccountUseCase.execute(followerId, followedId))
    }
    catch (e) {
        res.status(500).send("Could not follow account")
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
        const findAccountByElementIdUseCase = new FindAccount(accountController)
        res.status(200).send(await findAccountByElementIdUseCase.execute(elementID))
    } catch (e) {
        res.status(500).send("Could not found account with this ID")
    }
})

// FIXME:
accountRouter.patch("/", async (req: Request, res: Response) => {
    try {
        const { elementID, accountProperties } = req.body
        const updateAccountUseCase = new UpdateAccountProperties(accountController)
        res.status(200).send(updateAccountUseCase.execute(accountProperties, elementID))
    } catch (error) {
        res.status(500).send("Could not update account")
    }
})

accountRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const deleteAccountUseCase = new DeleteAccount(accountController)
        deleteAccountUseCase.execute(id)
        res.status(204).send("Account deleted")
    } catch (e) {
        res.status(500).send("Could not delete account")
    }
})

accountRouter.delete("/unfollow", async (req: Request, res: Response) => {
    try {
        const { baseAccountId, unfollowedAccountId } = req.body
        const unfollowAccountUseCase = new UnfollowAccount(accountController)
        unfollowAccountUseCase.execute(baseAccountId, unfollowedAccountId)
        res.status(204).send("Account unfollowed")
    } catch (e) {
        res.status(500).send("Could not unfollow account")
    }
})