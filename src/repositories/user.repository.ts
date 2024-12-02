import { ICar, IUser, IUserDocument, IUserListQuery } from "../interfaces";
import { User } from "../models";

class UserRepository {
   public async getAll(query: IUserListQuery, filter = {}): Promise<[IUser[], number]> {
      const skip = query.limit * (query.page - 1);
      return await Promise.all([
         User.find(filter).limit(query.limit).skip(skip),
         User.countDocuments(filter),
      ]);
   }

   public async create(dto: IUser): Promise<IUser> {
      return await User.create(dto);
   } 

   public async getByEmail(email: string): Promise<IUser | null> {
      return await User.findOne({ email }).select('+password');
   }

   public async getById(userId: string): Promise<IUserDocument | null> {
      return await User.findById(userId).select("+password");
   }

   public async getMe(userId: string): Promise<IUser | null> {
      return await User.findOne({_id: userId}).populate('cars', 'brand');
   }

   public async getByRole(role: string): Promise<IUser | null> {
      return await User.findOne({role});
   }

   public async updateMe(userId: string, dto: Partial<IUser>): Promise<IUser> {
      return await User.findByIdAndUpdate(userId, dto, {new: true});
   }

   public async updateCarsForUser(userId: string, car: ICar): Promise<IUser> {
      return await User.findByIdAndUpdate(userId, {
         $push: { cars: car._id }
      });
   }

   public async delete(userId: string): Promise<void> {
      await User.deleteOne({_id: userId});
   }
}

export const userRepository = new UserRepository();