import { Request, Response, NextFunction } from 'express';
import TeamsService from '../service/TeamsService';

async function matchValidation(req: Request, res: Response, next: NextFunction) {
  const { homeTeamId, awayTeamId } = req.body;
  const teamsService = new TeamsService();
  if (homeTeamId === awayTeamId) {
    return res
      .status(422)
      .json({
        message: 'It is not possible to create a match with two equal teams',
      });
  }
  const homeTeam = await teamsService.findTeamsById(homeTeamId);
  const awayTeam = await teamsService.findTeamsById(awayTeamId);
  if (!homeTeam || !awayTeam) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }
  next();
}

export default matchValidation;
