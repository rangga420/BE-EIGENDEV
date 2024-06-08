import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { BooksSeeder } from './seeders/seeder.book';
import { MembersSeeder } from './seeders/seeder.member';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  const options = new DocumentBuilder()
    .setTitle('BE-eigendev')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  //SEED DATA BOOK
  const bookSeeder = app.get(BooksSeeder);
  await bookSeeder.seedBook();

  //SEED DATA MEMBER
  const memberSeeder = app.get(MembersSeeder);
  await memberSeeder.seedMember();

  await app.listen(port);
}

bootstrap();
