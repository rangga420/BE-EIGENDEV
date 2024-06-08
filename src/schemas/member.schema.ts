import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Member {
  @Prop()
  code: string;

  @Prop()
  name: string;

  @Prop()
  penalty?: boolean;
}

export const MemberSchema = SchemaFactory.createForClass(Member);
