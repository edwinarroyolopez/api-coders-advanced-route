import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';

dotenv.config();

console.log(process.env.MONGODB_URI)


const dbLocal = "mongodb://testperformance:abcd.1234@localhost:27017";
const dbServer = "mongodb+srv://zeroedprogrammer:FrnnZSzyL9csqfCy@dev-test-riwi.n35bp.mongodb.net/?retryWrites=true&w=majority&appName=dev-test-riwi";

@Module({
  imports: [
    MongooseModule.forRoot(dbLocal),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
