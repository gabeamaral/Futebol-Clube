import { Router, Request, Response } from 'express';
import MatchesController from '../controller/MatchesController';

const matchesController = new MatchesController();

const routerMatches = Router();

routerMatches.get('/', (req: Request, res: Response) =>
  matchesController.findMatches(req, res));

export default routerMatches;
