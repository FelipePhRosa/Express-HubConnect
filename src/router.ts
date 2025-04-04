import { Router } from "express";
import UserController from "./controllers/userController";

const router = Router();
const userController = new UserController();

router.get('/', userController.welcome.bind(userController));

router.post('/user', userController.createUser.bind(userController));

router.get('/usersList', userController.getAllUsers.bind(userController));

router.get('/userById/:userId', userController.getUserById.bind(userController));

router.delete('/userDel/:userId', userController.deleteUser.bind(userController));

export default router;