import { Request, Response, NextFunction } from 'express';
import TokenJwt from '../utils/TokenJwt';

function tokenValidation(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token not found' });
  try {
    const tokenAuthentication = TokenJwt.verifyToken(authorization);
    res.locals.token = tokenAuthentication;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token must be a valid token' });
  }
}

export default tokenValidation;
