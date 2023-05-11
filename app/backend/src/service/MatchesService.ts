import { ModelStatic } from 'sequelize';
import MatchesModel from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';

class MatchesServices {
  model: ModelStatic<MatchesModel> = MatchesModel;

  async findMatches(inProgress : unknown): Promise<MatchesModel[]> {
    const match = await this.model.findAll(
      { include: [
        { model: TeamsModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamsModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
      },
    );
    if (inProgress === 'true') {
      return match.filter((matches) => matches.inProgress === true);
    }
    if (inProgress === 'false') {
      return match.filter((matches) => matches.inProgress === false);
    }
    return match;
  }
}

export default MatchesServices;
