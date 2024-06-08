import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BookModule } from 'src/modules/book/book.module';
import { MemberModule } from 'src/modules/member/member.module';
import { BookSchema } from 'src/schemas/book.schema';
import { MemberSchema } from 'src/schemas/member.schema';
import { BooksSeeder } from 'src/seeders/seeder.book';
import { MembersSeeder } from 'src/seeders/seeder.member';
import { BooksService } from 'src/seeders/services/service.book';
import { MembersService } from 'src/seeders/services/service.member';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_HOST'),
      }),
    }),
    MongooseModule.forFeature([
      { name: 'Book', schema: BookSchema },
      { name: 'Member', schema: MemberSchema },
    ]),
    MemberModule,
    BookModule,
  ],
  controllers: [],
  providers: [BooksSeeder, BooksService, MembersSeeder, MembersService],
})
export class AppModule {}
