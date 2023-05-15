import { Request, Response } from 'express';
import BoardService from '../service/LBService';

export default class LBController {
  static async getLeaderBoard(_req: Request, res: Response) {
    const leaderBoard = await BoardService.getLeaderBoard();
    res.status(200).json(leaderBoard);
  }
}
