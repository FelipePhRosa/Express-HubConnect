import { Router } from "express";
import UserController from "./controllers/userController";
import StoreController from "./controllers/storeController";
import { authenticate } from "./services/authMiddleware";
import AuthController from "./controllers/AuthController";

const router = Router();
const userController = new UserController();
const storeController = new StoreController();
const authController = new AuthController();    

router.get('/', userController.welcome.bind(userController));

router.post('/login', authController.login.bind(authController));

router.post('/user', userController.createUser.bind(userController));

router.get('/usersList', userController.getAllUsers.bind(userController));

router.get('/userById/:userId', userController.getUserById.bind(userController));

router.delete('/userDel/:userId', userController.deleteUser.bind(userController));


//Rotas Protegidas com JWT
router.post('/store', authenticate, storeController.createStore.bind(storeController));

export default router;