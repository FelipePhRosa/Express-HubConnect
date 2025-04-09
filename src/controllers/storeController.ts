import { Request, Response } from "express";
import AuthService from "../services/authService";
import { authenticate } from "../services/authMiddleware";
import storeService from "../services/storeService";
import UserService from "../services/userService";

interface AuthenticatedRequest extends Request {
    user?: {
      userId: number;
      email: string;
    };
  }

export default class StoreController {
    constructor(private storesService = new storeService(), private userService = new UserService()){}

    async createStore(req: AuthenticatedRequest, res: Response) {
        const { nameStore, descriptionStore, category, urlImage } = req.body
        const userId = req.user?.userId;

        if (!userId) {
            res.status(401).json({ error: `Unauthorized` });
            return
        }

        try {
            const user = await this.userService.getUserById(Number(userId));

            if (!user){
                res.status(500).send(`User not found.`)
            }
            
            await this.storesService.createStore({ 
                ownerId: user.id_user, 
                nameStore, 
                descriptionStore, 
                category, 
                urlImage });

            res.status(201).json({
                message: `Store ${nameStore} was created from user ${user.nameUser}`,
                data: {
                    ownerId: user.id_user, 
                    nameUser: user.nameUser,
                    nameStore, 
                    descriptionStore, 
                    category, 
                    urlImage
                }
                });

        } catch(error){
            res.status(500).json({ error: `Error to insert Store.`, details: error })
        }
    }


}