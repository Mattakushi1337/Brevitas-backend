import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { VisitModule } from './visits/visit.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';



@Module({
  imports: [VisitModule, UserModule, AuthModule, 
    MongooseModule.forRoot(`mongodb://localhost:27017/visits`,{ useNewUrlParser: true } ),
     ConfigModule.forRoot({
    validationSchema: Joi.object({
      JWT_SECRET: Joi.string().required(),
      JWT_EXPIRATION_TIME: Joi.string().required(),
    })
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
//MongooseModule.forRoot(`mongodb://localhost:27017/visits`,{ useNewUrlParser: true } )