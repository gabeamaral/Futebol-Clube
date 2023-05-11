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

  async findFinishedMatch(req: Request, res: Response): Promise<Response | void> {
    const { id } = req.params;
    await this.matchesService.findFinishedMatch(Number(id));
    res.status(200).json({ message: 'Finished' });
  }

  async updateMatchScores(req: Request, res: Response): Promise<Response | void> {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this.matchesService.updateMatchScores(Number(id), homeTeamGoals, awayTeamGoals);
    res.status(200).json({ message: 'Atualizado' });
  }

  async createNewMatch(req: Request, res: Response): Promise<Response | void> {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    const match = await
    this.matchesService.createNewMatch(homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals);
    res.status(201).json(match);
  }
}

export default MatchesController;
