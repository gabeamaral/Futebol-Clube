import { Router, Request, Response } from 'express';
import LBControler from '../controller/LBController';

const RouterLBoard = Router();

RouterLBoard.get('/home', (req: Request, res: Response) =>
  LBControler.getLBHome(req, res));

RouterLBoard.get('/away', (req: Request, res: Response) =>
  LBControler.getLBAway(req, res));

export default RouterLBoard;
