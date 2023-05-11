import * as bcrypt from 'bcryptjs';
import { ModelStatic } from 'sequelize';
import Users from '../database/models/UsersModel';
import ILogin from '../interface/ILogin';
import IToken from '../interface/IToken';
import TokenJwt from '../utils/TokenJwt';

class LoginService {
  protected model: ModelStatic<Users> = Users;
  login = async ({ email, password }: ILogin): Promise<IToken | undefined> => {
    const user = await this.model.findOne({ where: { email } });
    if (!user) {
      return undefined;
    }
    const passwordTest = bcrypt.compareSync(password, user.password);
    if (!passwordTest) {
      return undefined;
    }
    const token = TokenJwt.buildToken(email);
    return { token };
  };

  roleLogin = async (email: string): Promise<string | undefined> => {
    try {
      const user = await this.model.findOne({ where: { email } });
      return user?.role;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  };
}

export default LoginService;
