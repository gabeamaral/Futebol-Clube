import { Router, Request, Response } from 'express';
import MatchesController from '../controller/MatchesController';
import matchValidation from '../middleware/MatchMiddleware';
import tokenValidation from '../middleware/TokenMiddleware';

const matchesController = new MatchesController();

const routerMatches = Router();

routerMatches.get('/', (req: Request, res: Response) =>
  matchesController.findMatches(req, res));
routerMatches.patch(
  '/:id/finish',
  tokenValidation,
  (req: Request, res: Response) => matchesController.findFinishedMatch(req, res),
);
routerMatches.patch('/:id', tokenValidation, (req: Request, res: Response) =>
  matchesController.updateMatchScores(req, res));
routerMatches.post(
  '/',
  tokenValidation,
  matchValidation,
  (req: Request, res: Response) => matchesController.createNewMatch(req, res),
);

export default routerMatches;
