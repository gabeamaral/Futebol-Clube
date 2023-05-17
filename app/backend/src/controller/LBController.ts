import { Request, Response } from 'express';
import LBService from '../service/LBService';

export default class LBController {
  static async getLBHome(_req: Request, res: Response) {
    const lBoardHome = await LBService.getLBHome();
    res.status(200).json(lBoardHome);
  }

  static async getLBAway(_req: Request, res: Response) {
    const lBoardAway = await LBService.getLBAway();
    res.status(200).json(lBoardAway);
  }
}
