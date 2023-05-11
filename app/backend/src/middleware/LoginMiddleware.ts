import { Request, Response, NextFunction } from 'express';

const emailValidation = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

function loginValidation(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  if (!emailValidation(email) || password.length < 6) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  return next();
}

export default loginValidation;
