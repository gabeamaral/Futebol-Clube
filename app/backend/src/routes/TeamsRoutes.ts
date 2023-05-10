import { Router } from 'express';
import TeamsController from '../controller/TeamsController';

const teamsController = new TeamsController();
const routerTeams = Router();

routerTeams.get('/', (req, res) => teamsController.findTeams(req, res));

export default routerTeams;
