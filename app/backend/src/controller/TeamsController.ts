import { Request, Response } from 'express';
import TeamsService from '../service/TeamsService';

class TeamsController {
  constructor(private teamsService = new TeamsService()) {}

  public async findTeams(req: Request, res: Response): Promise<Response | void> {
    console.log('aqui');
    try {
      const result = await this.teamsService.findTeams();
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
    }
  }

  public async findTeamsById(req: Request, res: Response): Promise<Response | void> {
    try {
      const { id } = req.params;
      const result = await this.teamsService.findTeamsById(Number(id));
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
    }
  }
}

export default TeamsController;
