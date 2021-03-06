import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LinkDocument = Link & Document;

@Schema()
export class Link {
  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  urlHash: string;

  @Prop({ required: true })
  shortUrl: string;
}

export const LinkSchema = SchemaFactory.createForClass(Link);
