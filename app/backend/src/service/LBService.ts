import MatchesModel from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';
import { getStatsHome, getStatsAway } from '../utils/LeaderBoard';

class LBService {
  static async getLBHome() {
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

  static async getLBAway() {
    const teams = await TeamsModel.findAll();
    const awayTeams: Array<unknown> = await teams.map(async (team) => {
      const awayMatches = await MatchesModel.findAll({
        where: { awayTeamId: team.id, inProgress: false },
      });
      const statsAway = await awayMatches.map((match) =>
        getStatsAway(team.teamName, [match]));
      const statsTeams = statsAway[awayMatches.length - 1];
      return { ...statsTeams };
    });
    const TeamsResults = await Promise.all(awayTeams);
    return TeamsResults;
  }
}

export default LBService;
