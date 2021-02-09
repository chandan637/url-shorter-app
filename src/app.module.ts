import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LinksController } from './links/links.controller';
import { LinksService } from './links/links.service';
import { LinkSchema } from './schemas/link.schema';
import { LinksModule } from './links/links.module';
@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest'), LinksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
