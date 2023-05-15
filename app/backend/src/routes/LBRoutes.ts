import { Router, Request, Response } from 'express';
import LBControler from '../controller/LBController';

const RouterLBoard = Router();

RouterLBoard.get('/home', (req: Request, res: Response) =>
  LBControler.getLeaderBoard(req, res));

export default RouterLBoard;
