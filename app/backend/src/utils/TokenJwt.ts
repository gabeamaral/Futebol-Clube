import * as jwt from 'jsonwebtoken';
import process = require('process');

class TokenJwt {
  static buildToken(email: string) {
    const secret = `${process.env.JWT_SECRET}`;
    return jwt.sign({ email }, secret);
  }

  static verifyToken(token: string) {
    const secret = `${process.env.JWT_SECRET}`;
    return jwt.verify(token, secret);
  }
}

export default TokenJwt;
