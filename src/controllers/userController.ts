import { Request, Response } from "express";
import UserService from "../services/userService";

export default class UserController {
    constructor(private userService = new UserService()){}

    welcome(req: Request, res: Response) {
        res.json({ 
            message: "Welcome to the HubConnect API!",
            routes: {
                users: {
                    create: "POST /user",
                    list: "GET /usersList",
                    listByID: "GET /usersList/:userId",
                    delete: "DELETE /userDel/:userId"
                },
                stores: {
                    create: "Not Created yet.",
                    list: "Not Created yet.",
                    delete: "Not Created yet."
                },
                auth: {
                    login: "Not Created yet."
                },
                products: {
                    create: "Not Created yet."
                }
                
            }
        })   
    }

    async createUser(req: Request, res: Response) {
        const { nameUser, lastName, ageUser, password_hash, nationalityUser } = req.body

        try {
            await this.userService.createUser({ nameUser, lastName, ageUser, password_hash, nationalityUser });
            res.status(200).send(`User ${nameUser}, insert successfully!`);
        } catch(error){
            res.status(500).json({ error: `Error to insert User.`, details: error })
        }
    }

    async getAllUsers(req: Request, res: Response) {
        try{
            const users = await this.userService.getAllUsers();
            res.status(200).json(users);
        } catch(error) {
            res.status(500).json({ error: `Failed to Load Users.`, details: error })
        }
    }

    async getUserById(req: Request, res: Response) {
        const { userId } = req.params
        try{
            const user = await this.userService.getUserById(Number(userId));

            if(!user){
                res.status(404).json({ error: `UserID not found. ` });
            }

            res.status(200).json({ message: `Informations for ${user.nameUser}`, data: user})
        } catch(error){
            res.status(500).json({ message: `Error to Load User.`, details: error });
        }
    }

    async deleteUser(req: Request, res: Response) {
        const { userId } = req.params
        try{
            const user = await this.userService.getUserById(Number(userId));

            if(!user){
                res.status(404).json({ error: `UserID not found. ` });
            }

            res.status(200).json({ message: `${user.nameUser} was deleted successfully. `,
                                   deletedUser: user
            })
            const userdel = await this.userService.deleteUser(Number(userId));

        } catch(error) {
            res.status(500).json({ error: `Error to Delete User. ` })
        }
    }
}
