import express, {NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { configs } from "./configs/configs";
import { ApiError } from "./errors";
import { adminRouter, authRouter, carRouter, managerRouter, userRouter } from "./routers";
import { userRepository } from "./repositories";
import { adminService } from "./services/admin.service";
import { RoleEnum, TypeAccountEnum } from "./enums";
import { IUser } from "./interfaces";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/manager', managerRouter);
app.use('/users', userRouter);
app.use('/cars', carRouter);

app.use('*', (error: ApiError, req: Request, res: Response, next: NextFunction) => {
   res.status(error.status || 500).send(error.message);
});

process.on('uncaughtException', (error) => {
   console.error('uncaughtException', error.message, error.stack);
   process.exit(1)
})

const createAdmin = async () => {
   try {
      const adminIsExist = await userRepository.getByRole('admin');
      if (!adminIsExist) {
         const admin: IUser = {
            userName: 'admin',
            email: 'admin@gmail.com',
            password: 'admin',
            phone: '380502123215',
            role: RoleEnum.ADMIN,
            typeAccount: TypeAccountEnum.PREMIUM,
          };
          
         await adminService.createAdmin(admin);
         console.log('Admin creating succesful');
      } else {
         console.log('Admin is Existing');
      }
   } catch (e) {
      console.error('Fault', e)
   }
}

const connection = async () => {
   let dbCon = false

   while (!dbCon) {
       try {
           console.log('Connection to DB...');
           await mongoose.connect(configs.MONGO_URI)
           dbCon = true
           console.log('Database available');
       } catch (e) {
           console.log('Database unavailable, wait 3 sec');
           await new Promise(resolve => setTimeout(resolve, 3000))
       }
   }
}

const start = async () => {
   await connection();
   await createAdmin();

   app.listen(configs.APP_PORT, () => {
   console.log(`Server is running on http://${configs.APP_HOST}:${configs.APP_PORT}`);
   });
}

start();

// app.listen(configs.APP_PORT, async () => {
//    await connection();
//    console.log(`Server is running on http://${configs.APP_HOST}:${configs.APP_PORT}`);
// });