import { ModelStatic } from 'sequelize';
import TeamsModel from '../database/models/TeamsModel';

class TeamsService {
  private teamModel: ModelStatic<TeamsModel> = TeamsModel;

  async findTeams(): Promise<TeamsModel[]> {
    const result = await this.teamModel.findAll();
    return result;
  }
}

export default TeamsService;
