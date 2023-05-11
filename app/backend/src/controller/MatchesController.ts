import { Request, Response } from 'express';
import MatchesService from '../service/MatchesService';

class MatchesController {
  private matchesService: MatchesService;

  constructor() {
    this.matchesService = new MatchesService();
  }

  public async findMatches(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;
    const matches = await this.matchesService.findMatches(inProgress);
    return res.status(200).json(matches);
  }
}

export default MatchesController;
