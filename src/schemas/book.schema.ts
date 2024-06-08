import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Book {
  @Prop()
  code: string;

  @Prop()
  title: string;

  @Prop()
  author: string;

  @Prop()
  stock: number;
}

export const BookSchema = SchemaFactory.createForClass(Book);
