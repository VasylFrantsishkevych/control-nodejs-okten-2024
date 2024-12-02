import { ApiError } from "../errors";
import { ISignIn, ITokenPair, ITokenPayload, IUser } from "../interfaces";
import { tokenRepository, userRepository } from "../repositories";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
   public async signUp(dto: IUser): Promise<{user: IUser, tokens: ITokenPair}> {
      await this.isEmailExistOrThrow(dto.email);
      const password = await passwordService.hashPassword(dto.password);
      const user = await userRepository.create({...dto, password});

      const tokens = tokenService.generatTokens({userId: user._id, role: user.role, typeAccount: user.typeAccount});
      await tokenRepository.create({...tokens, _userId: user._id});

      return {user, tokens};
   }

   public async signIn(dto:ISignIn): Promise<{user: IUser; tokens: ITokenPair}> {
      const user = await userRepository.getByEmail(dto.email);
      if (!user) {
         throw new ApiError('User not found', 404);
      }

      const isPasswordCorrect = await passwordService.comparePassword(
         dto.password,
         user.password
      )
      if (!isPasswordCorrect) {
         throw new ApiError('Invalid credential', 401);
      }

      const tokens = tokenService.generatTokens({userId: user._id, role: user.role, typeAccount: user.typeAccount})
      await tokenRepository.create({...tokens, _userId: user._id})

      return {user, tokens}
   }

   public async registerManager() {
      
   }

   public async refresh(refreshToken: string, payload: ITokenPayload): Promise<ITokenPair>{
      await tokenRepository.deleteOneByParams({refreshToken});
      const tokens = tokenService.generatTokens({
         userId: payload.userId, 
         role: payload.role, 
         typeAccount: payload.typeAccount
      });
      await tokenRepository.create({...tokens, _userId: payload.userId})
      return tokens;
   }

   public async logout(tokenId: string): Promise<void> {
      await tokenRepository.deleteOneByParams({_id: tokenId});
   }

   private async isEmailExistOrThrow(email: string): Promise<void> {
      const user = await userRepository.getByEmail(email);
      if (user) {
        throw new ApiError("Email already exists", 409);
      }
    }
}

export const authService = new AuthService();