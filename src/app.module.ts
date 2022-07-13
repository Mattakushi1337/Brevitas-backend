import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { VisitModule } from './visits/visit.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import * as Joi from 'joi';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UrlGeneratorModule } from 'nestjs-url-generator';



@Module({
  imports: [VisitModule, UserModule, AuthModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        MONGO_DATABASE: Joi.string().required(),
        MONGO_HOST: Joi.string().required(),
        MONGO_PORT: Joi.string().required(),
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const database = configService.get('MONGO_DATABASE');
        const host = configService.get('MONGO_HOST');
        const port = configService.get('MONGO_PORT');


        return {
          uri: `mongodb://${host}:${port}`,
          dbName: database,
        };
      },
      inject: [ConfigService],
    }),
    UrlGeneratorModule.forRoot({
      secret: 'secret', // optional, required only for signed URL
      appUrl: 'https://localhost:3000',
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }