import { Request, Response } from 'express';
import LoginService from '../service/LoginService';

class LoginController {
  private service: LoginService;
  constructor(service: LoginService) {
    this.service = service;
  }

  login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    const token = await this.service.login({ email, password });
    if (!token) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }
    res.status(200).json(token);
  };

  roleLogin = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email } = res.locals.token;
      const resLogin = await this.service.roleLogin(email);
      if (!resLogin) {
        res.status(401).json({ message: 'Invalid email or password' });
        return;
      }
      res.status(200).json({ role: resLogin });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
}

export default LoginController;
