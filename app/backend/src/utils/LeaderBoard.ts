import { IMatch } from '../interface/IMatch';

const teamStats = {
  name: '',
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
};

const resetStats = () => {
  teamStats.totalPoints = 0;
  teamStats.totalGames = 0;
  teamStats.totalVictories = 0;
  teamStats.totalDraws = 0;
  teamStats.totalLosses = 0;
  teamStats.goalsFavor = 0;
  teamStats.goalsOwn = 0;
};

const homeVictory = (homeTeamGoals: number, awayTeamGoals: number) => {
  teamStats.totalPoints += 3;
  teamStats.totalVictories += 1;
  teamStats.goalsFavor += homeTeamGoals;
  teamStats.goalsOwn += awayTeamGoals;
};

const awayVictory = (homeTeamGoals: number, awayTeamGoals: number) => {
  teamStats.totalPoints += 3;
  teamStats.totalVictories += 1;
  teamStats.goalsFavor += awayTeamGoals;
  teamStats.goalsOwn += homeTeamGoals;
};

const drawHome = (homeTeamGoals: number, awayTeamGoals: number) => {
  teamStats.totalPoints += 1;
  teamStats.totalDraws += 1;
  teamStats.goalsFavor += homeTeamGoals;
  teamStats.goalsOwn += awayTeamGoals;
};

const drawAway = (homeTeamGoals: number, awayTeamGoals: number) => {
  teamStats.totalPoints += 1;
  teamStats.totalDraws += 1;
  teamStats.goalsFavor += awayTeamGoals;
  teamStats.goalsOwn += homeTeamGoals;
};

const defeatHome = (homeTeamGoals: number, awayTeamGoals: number) => {
  teamStats.totalPoints += 0;
  teamStats.totalLosses += 1;
  teamStats.goalsFavor += homeTeamGoals;
  teamStats.goalsOwn += awayTeamGoals;
};

const defeatAway = (homeTeamGoals: number, awayTeamGoals: number) => {
  teamStats.totalPoints += 0;
  teamStats.totalLosses += 1;
  teamStats.goalsFavor += awayTeamGoals;
  teamStats.goalsOwn += homeTeamGoals;
};

const addScoreHome = (matches: IMatch[]) => {
  matches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    if (homeTeamGoals > awayTeamGoals) { homeVictory(homeTeamGoals, awayTeamGoals); }
    if (homeTeamGoals === awayTeamGoals) { drawHome(homeTeamGoals, awayTeamGoals); }
    if (homeTeamGoals < awayTeamGoals) { defeatHome(homeTeamGoals, awayTeamGoals); }
  });
};

const addScoreAway = (matches: IMatch[]) => {
  matches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    if (homeTeamGoals > awayTeamGoals) { awayVictory(homeTeamGoals, awayTeamGoals); }
    if (homeTeamGoals === awayTeamGoals) { drawAway(homeTeamGoals, awayTeamGoals); }
    if (homeTeamGoals < awayTeamGoals) { defeatAway(homeTeamGoals, awayTeamGoals); }
  });
};

const getStatsHome = (name: string, matches: IMatch[]) => {
  if (name !== teamStats.name) {
    resetStats();
  }
  teamStats.name = name;
  addScoreHome(matches);
  teamStats.totalGames += 1;
  return teamStats;
};

const getStatsAway = (name: string, matches: IMatch[]) => {
  if (name !== teamStats.name) {
    resetStats();
  }
  teamStats.name = name;
  addScoreAway(matches);
  teamStats.totalGames += 1;
  return teamStats;
};

export { getStatsHome, getStatsAway };
