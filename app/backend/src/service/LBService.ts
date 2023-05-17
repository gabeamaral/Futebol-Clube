import ITeams from '../interface/ITeams';
import MatchesModel from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';
import { getStatsHome, getStatsAway, classifyTeams } from '../utils/LeaderBoard';

class LBService {
  static async getLBHome() {
    const teams = await TeamsModel.findAll() as unknown as ITeams[];
    const homeTeams = await teams.map(async (team) => {
      const homeMatches = await MatchesModel.findAll({
        where: { homeTeamId: team.id, inProgress: false },
      });
      const statsHome = await homeMatches.map((match) =>
        getStatsHome(team.teamName, [match]));
      const statsTeams = statsHome[homeMatches.length - 1];
      return { ...statsTeams };
    });
    const teamsResults = await Promise.all(homeTeams);
    const resultsSorted = classifyTeams(teamsResults);
    return resultsSorted;
  }

  static async getLBAway() {
    const teams = await TeamsModel.findAll() as unknown as ITeams[];
    const awayTeams = await teams.map(async (team) => {
      const awayMatches = await MatchesModel.findAll({
        where: { awayTeamId: team.id, inProgress: false },
      });
      const statsAway = await awayMatches.map((match) =>
        getStatsAway(team.teamName, [match]));
      const statsTeams = statsAway[awayMatches.length - 1];
      return { ...statsTeams };
    });
    const teamsResults = await Promise.all(awayTeams);
    return teamsResults;
  }
}

export default LBService;
