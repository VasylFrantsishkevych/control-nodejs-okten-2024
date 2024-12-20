import * as jsonwebtoken from 'jsonwebtoken';
import { ITokenPair, ITokenPayload } from '../interfaces';
import { configs } from '../configs/configs';
import { TokenTypeEnum } from '../enums';
import { ApiError } from '../errors';

class TokenService {
   public generatTokens(payload: ITokenPayload): ITokenPair {
      const accessToken = jsonwebtoken.sign(payload, configs.JWT_ACCESS_SECRET, {
         expiresIn: configs.JWT_ACCESS_EXPIRATION
      })
      const refreshToken = jsonwebtoken.sign(payload, configs.JWT_REFRESH_SECRET, {
         expiresIn: configs.JWT_REFRESH_EXPIRATION
      })
      return {accessToken, refreshToken};
   }

   public verifyToken(token: string, type: TokenTypeEnum): ITokenPayload {
      let secret: string;
      try {
         switch (type) {
            case TokenTypeEnum.ACCESS:
               secret = configs.JWT_ACCESS_SECRET
               break;
            case TokenTypeEnum.REFRESH:
               secret = configs.JWT_REFRESH_SECRET
               break;   
         }
         return jsonwebtoken.verify(token, secret) as ITokenPayload;
      } catch (e) {
         throw new ApiError('Invalid token', 401);
      }
   }
}

export const tokenService = new TokenService();