import { Module } from '@nestjs/common';
import { MemberController } from './controller/member.controller';
import { MemberService } from './service/member.service';
import { MemberSchema } from 'src/schemas/member.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { BookBorrowSchema } from 'src/schemas/bookBorrow.schema';
import { BookSchema } from 'src/schemas/book.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Member', schema: MemberSchema },
      { name: 'Book', schema: BookSchema },
      { name: 'BookBorrow', schema: BookBorrowSchema },
    ]), // Import model ke dalam MongooseModule
  ],
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule {}
