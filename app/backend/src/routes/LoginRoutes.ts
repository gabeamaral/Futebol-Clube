import { Router, Request, Response } from 'express';
import LoginController from '../controller/LoginController';
import loginValidation from '../middleware/LoginMiddleware';
import LoginService from '../service/LoginService';

const routerLogin = Router();
const loginService = new LoginService();
const loginController = new LoginController(loginService);

routerLogin.post(
  '/',
  loginValidation,
  (req: Request, res: Response) => loginController.login(req, res),
);

export default routerLogin;
