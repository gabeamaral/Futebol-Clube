import { Router, Request, Response } from 'express';
import LoginController from '../controller/LoginController';
import loginValidation from '../middleware/LoginMiddleware';
import LoginService from '../service/LoginService';
import tokenValidation from '../middleware/TokenMiddleware';

const routerLogin = Router();
const loginService = new LoginService();
const loginController = new LoginController(loginService);

routerLogin.post('/', loginValidation, (req: Request, res: Response) =>
  loginController.login(req, res));

routerLogin.get('/role', tokenValidation, (req: Request, res: Response) =>
  loginController.roleLogin(req, res));

export default routerLogin;
