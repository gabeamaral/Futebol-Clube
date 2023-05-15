import MatchesModel from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';
import { getStatsHome } from '../utils/LeaderBoard';

class LBService {
  static async getLeaderBoard() {
    const teams = await TeamsModel.findAll();
    const homeTeams: Array<unknown> = await teams.map(async (team) => {
      const homeMatches = await MatchesModel.findAll({
        where: { homeTeamId: team.id, inProgress: false },
      });
      const statsHome = await homeMatches.map((match) =>
        getStatsHome(team.teamName, [match]));
      const statsTeams = statsHome[homeMatches.length - 1];
      return { ...statsTeams };
    });
    const TeamsResults = await Promise.all(homeTeams);
    return TeamsResults;
  }
}

export default LBService;
