import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class BookBorrow {
  @Prop()
  memberCode: string;

  @Prop()
  bookCode: string;

  @Prop()
  loadDate: Date;
}

export const BookBorrowSchema = SchemaFactory.createForClass(BookBorrow);
