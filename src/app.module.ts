import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';

dotenv.config();

console.log(process.env.MONGODB_URI)

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_UR || "mongodb+srv://zeroedprogrammer:FrnnZSzyL9csqfCy@dev-test-riwi.n35bp.mongodb.net/?retryWrites=true&w=majority&appName=dev-test-riwi"),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
