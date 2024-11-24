import { ITokenPair, IUser } from "../interfaces";
import { authService } from "./auth.service";

class AdminService {
   public async createAdmin(admin: IUser): Promise<void> {
      await authService.signUp(admin);
    }

   public async signUpManager(managerDto: IUser): Promise<{user: IUser, tokens: ITokenPair}> {
      return await authService.signUp(managerDto);
   }
}

export const adminService = new AdminService();