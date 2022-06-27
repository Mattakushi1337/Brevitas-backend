import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { VisitModule } from './visits/visit.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [VisitModule, MongooseModule.forRoot(`mongodb://localhost:27017/visits`,{ useNewUrlParser: true } ), UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
