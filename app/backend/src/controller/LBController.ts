import { Request, Response } from 'express';
import BoardService from '../service/LBService';

export default class LBController {
  static async getLBHome(_req: Request, res: Response) {
    const lBoardHome = await BoardService.getLBHome();
    res.status(200).json(lBoardHome);
  }

  static async getLBAway(_req: Request, res: Response) {
    const lBoardAway = await BoardService.getLBAway();
    res.status(200).json(lBoardAway);
  }
}
