import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Number, required: true, index: true })
  price: number;

  @Prop()
  description: string;

  @Prop({ type: String })
  stock: number;

  @Prop()
  imageUrl: string;

  @Prop({ required: true, index: true })
  category: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.index({ price: 1, category: 'text' });
