import { IUser } from "../interfaces";
import { User } from "../models";

class UserRepository {
   public async getAll(): Promise<IUser[]> {
      return await User.find({});
   }

   public async create(dto: IUser): Promise<IUser> {
      return await User.create(dto);
   } 

   public async getByEmail(email: string): Promise<IUser | null> {
      return await User.findOne({ email }).select('+password');
   }

   public async getById(userId: string): Promise<IUser | null> {
      return await User.findById(userId).select("+password");
   }

   public async getByRole(role: string): Promise<IUser | null> {
      return await User.findOne({role});
   }

   public async updateById(userId: string, dto: Partial<IUser>): Promise<IUser> {
      return await User.findByIdAndUpdate(userId, dto, {new: true});
   }

   public async delete(userId: string): Promise<void> {
      await User.deleteOne({_id: userId});
   }
}

export const userRepository = new UserRepository();