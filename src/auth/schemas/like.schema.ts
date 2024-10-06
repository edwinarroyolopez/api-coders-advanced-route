import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Like extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  productId: string;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
