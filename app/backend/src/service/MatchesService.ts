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

  async findFinishedMatch(id: number): Promise<void> {
    const match = await this.model.findByPk(id);
    if (match) {
      await match.update({ inProgress: false });
    }
  }

  async updateMatchScores(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<number[] | undefined> {
    try {
      const [numAffectedRows] = await this.model.update(
        { homeTeamGoals, awayTeamGoals },
        { where: { id } },
      );
      return [numAffectedRows];
    } catch (err) {
      console.error(`Error updating match scores: ${err}`);
      return undefined;
    }
  }

  async createNewMatch(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: Date,
    awayTeamGoals: string,
  )
    : Promise<MatchesModel> {
    return this.model.create({
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
  }
}

export default MatchesServices;
