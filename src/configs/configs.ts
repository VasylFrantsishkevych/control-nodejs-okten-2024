import { ObjectCannedACL } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

dotenv.config();

export const configs = {
   APP_PORT: process.env.APP_PORT || 5005,
   APP_HOST: process.env.APP_HOST,
   APP_FRONT_URL: process.env.APP_FRONT_URL,
   MONGO_URI: process.env.MONGO_URI,
   JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
   JWT_ACCESS_EXPIRATION: process.env.JWT_ACCESS_EXPIRATION,
   JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
   JWT_REFRESH_EXPIRATION: process.env.JWT_REFRESH_EXPIRATION,

   AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
   AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
   AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,
   AWS_S3_REGION: process.env.AWS_S3_REGION,
   AWS_S3_ACL: process.env.AWS_S3_ACL as ObjectCannedACL,
   AWS_S3_ENDPOINT: process.env.AWS_S3_ENDPOINT,
}